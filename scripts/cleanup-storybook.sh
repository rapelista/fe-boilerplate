#!/bin/bash

# Script untuk cleanup dependency Storybook dari project
# Compatible with: Linux, macOS, Windows (via Git Bash/WSL)
# Package Managers: pnpm, yarn, npm (auto-detected)
# Author: Frontend Boilerplate Team
# Date: $(date +"%Y-%m-%d")

set -e  # Exit jika ada error

echo "🧹 Starting Storybook cleanup process..."

# Fungsi untuk logging
log() {
    echo "📝 $1"
}

error() {
    echo "❌ Error: $1" >&2
    exit 1
}

success() {
    echo "✅ $1"
}

# Detect package manager
detect_package_manager() {
    if [ -f "pnpm-lock.yaml" ] || [ -f ".pnpmfile.cjs" ]; then
        PKG_MANAGER="pnpm"
    elif [ -f "yarn.lock" ]; then
        PKG_MANAGER="yarn"
    elif [ -f "package-lock.json" ]; then
        PKG_MANAGER="npm"
    else
        PKG_MANAGER="npm"  # Default fallback
    fi
}

detect_package_manager
log "Detected package manager: $PKG_MANAGER"

# Check if package manager is available
if ! command -v "$PKG_MANAGER" &> /dev/null; then
    error "$PKG_MANAGER is not installed. Please install $PKG_MANAGER first."
fi

# Check if we're in the right directory (project root)
if [ ! -f "package.json" ]; then
    error "package.json not found. Please run this script from the project root directory."
fi

log "Removing Storybook dependencies..."

# Uninstall Storybook related packages
STORYBOOK_PACKAGES=(
    "@chromatic-com/storybook"
    "@storybook/addon-essentials"
    "@storybook/addon-interactions"
    "@storybook/addon-onboarding"
    "@storybook/blocks"
    "@storybook/experimental-addon-test"
    "@storybook/experimental-nextjs-vite"
    "@storybook/nextjs"
    "@storybook/react"
    "@storybook/test"
    "eslint-plugin-storybook"
    "storybook"
)

# Uninstall MSW related packages
MSW_PACKAGES=(
    "msw"
    "msw-storybook-addon"
)

# Combine all packages to remove
ALL_PACKAGES=("${STORYBOOK_PACKAGES[@]}" "${MSW_PACKAGES[@]}")

log "Uninstalling packages: ${ALL_PACKAGES[*]}"

# Remove packages using detected package manager
for package in "${ALL_PACKAGES[@]}"; do
    # Check if package exists based on package manager
    case "$PKG_MANAGER" in
        "pnpm")
            if pnpm list "$package" &> /dev/null; then
                log "Removing $package..."
                pnpm remove "$package" || log "Warning: Failed to remove $package (might not be installed)"
            else
                log "Package $package not found, skipping..."
            fi
            ;;
        "yarn")
            if yarn list --pattern "$package" &> /dev/null; then
                log "Removing $package..."
                yarn remove "$package" || log "Warning: Failed to remove $package (might not be installed)"
            else
                log "Package $package not found, skipping..."
            fi
            ;;
        "npm")
            if npm list "$package" &> /dev/null; then
                log "Removing $package..."
                npm uninstall "$package" || log "Warning: Failed to remove $package (might not be installed)"
            else
                log "Package $package not found, skipping..."
            fi
            ;;
    esac
done

log "Removing Storybook scripts from package.json..."

# Detect OS and set appropriate sed command
detect_os() {
    case "$(uname -s)" in
        Linux*)     OS_TYPE="Linux";;
        Darwin*)    OS_TYPE="macOS";;
        CYGWIN*)    OS_TYPE="Windows";;
        MINGW*)     OS_TYPE="Windows";;
        *)          OS_TYPE="Unknown";;
    esac
}

detect_os
log "Detected OS: $OS_TYPE"

# Set sed command based on OS and availability
if command -v gsed &> /dev/null; then
    # Use GNU sed if available (preferred for all operations)
    SED_CMD="gsed"
    SED_INPLACE="-i"
elif [[ "$OS_TYPE" == "macOS" ]]; then
    # macOS uses BSD sed, needs backup extension for -i
    SED_CMD="sed"
    SED_INPLACE="-i ''"
else
    # Linux and most Unix systems use GNU sed
    SED_CMD="sed"
    SED_INPLACE="-i"
fi

log "Using sed command: $SED_CMD with flags: $SED_INPLACE"

# Create backup of package.json
cp package.json package.json.backup
log "Created backup: package.json.backup"

# Remove storybook scripts with OS-appropriate sed
eval "$SED_CMD $SED_INPLACE '/\"storybook\":/d' package.json"
eval "$SED_CMD $SED_INPLACE '/\"build:storybook\":/d' package.json"

log "Removing MSW configuration from package.json..."
# Remove MSW configuration block
eval "$SED_CMD $SED_INPLACE '/\"msw\": {/,/}/d' package.json"

log "Removing Storybook directories..."

# Remove .storybook directory
if [ -d ".storybook" ]; then
    rm -rf ".storybook"
    success "Removed .storybook directory"
else
    log ".storybook directory not found, skipping..."
fi

# Remove stories directory
if [ -d "stories" ]; then
    rm -rf "stories"
    success "Removed stories directory"
else
    log "stories directory not found, skipping..."
fi

log "Removing MSW worker file..."
# Remove MSW worker file
if [ -f "public/mockServiceWorker.js" ]; then
    rm -f "public/mockServiceWorker.js"
    success "Removed public/mockServiceWorker.js"
else
    log "public/mockServiceWorker.js not found, skipping..."
fi

log "Updating README.md..."

# Update README.md to remove Storybook section
if [ -f "README.md" ]; then
    # Create backup of README.md
    cp README.md README.md.backup
    log "Created backup: README.md.backup"
    
    # Remove Storybook section from README.md
    # This removes from "## Storybook" until the next "##" section or end of file
    eval "$SED_CMD $SED_INPLACE '/^## Storybook$/,/^## /{ /^## Storybook$/d; /^## /!d; }' README.md"
    eval "$SED_CMD $SED_INPLACE '/^## Storybook$/,/^$/d' README.md"
    
    success "Updated README.md (removed Storybook section)"
else
    log "README.md not found, skipping..."
fi

log "Updating ESLint configuration..."

# Update eslint.config.mjs to remove Storybook plugin
if [ -f "eslint.config.mjs" ]; then
    # Create backup of eslint.config.mjs
    cp eslint.config.mjs eslint.config.mjs.backup
    log "Created backup: eslint.config.mjs.backup"
    
    # Remove 'plugin:storybook/recommended' from extends array
    # Handle the specific format in the file
    eval "$SED_CMD $SED_INPLACE '/plugin:storybook\/recommended/d' eslint.config.mjs"
    
    # Clean up any lines that are now just commas or commas with whitespace
    eval "$SED_CMD $SED_INPLACE '/^[[:space:]]*,*[[:space:]]*$/d' eslint.config.mjs"
    
    # Fix trailing commas before closing parentheses/brackets
    eval "$SED_CMD $SED_INPLACE 's/,[[:space:]]*)/)/g' eslint.config.mjs"
    eval "$SED_CMD $SED_INPLACE 's/,[[:space:]]*]/]/g' eslint.config.mjs"
    
    success "Updated eslint.config.mjs (removed Storybook plugin)"
elif [ -f ".eslintrc.js" ] || [ -f ".eslintrc.json" ] || [ -f ".eslintrc.yml" ] || [ -f ".eslintrc.yaml" ]; then
    # Handle legacy ESLint config files
    for eslint_file in .eslintrc.js .eslintrc.json .eslintrc.yml .eslintrc.yaml; do
        if [ -f "$eslint_file" ]; then
            cp "$eslint_file" "${eslint_file}.backup"
            log "Created backup: ${eslint_file}.backup"
            
            # Remove storybook plugin references
            eval "$SED_CMD $SED_INPLACE '/plugin:storybook/d' '$eslint_file'"
            eval "$SED_CMD $SED_INPLACE '/storybook/d' '$eslint_file'"
            
            log "Updated $eslint_file (removed Storybook references)"
        fi
    done
    success "Updated ESLint configuration files"
else
    log "No ESLint configuration file found, skipping..."
fi

log "Cleaning up node_modules and lock file..."

# Remove node_modules and package manager lock files
rm -rf node_modules

# Remove lock file based on package manager
case "$PKG_MANAGER" in
    "pnpm")
        rm -f pnpm-lock.yaml
        ;;
    "yarn")
        rm -f yarn.lock
        ;;
    "npm")
        rm -f package-lock.json
        ;;
esac

log "Reinstalling dependencies..."
case "$PKG_MANAGER" in
    "pnpm")
        pnpm install
        ;;
    "yarn")
        yarn install
        ;;
    "npm")
        npm install
        ;;
esac

success "🎉 Storybook cleanup completed successfully!"
echo ""
echo "📋 Summary of changes:"
echo "   - Removed Storybook and MSW dependencies"
echo "   - Deleted .storybook and stories directories"
echo "   - Removed MSW worker file"
echo "   - Updated package.json (removed storybook scripts and MSW config)"
echo "   - Updated README.md (removed Storybook section)"
echo "   - Updated ESLint configuration (removed Storybook plugin)"
echo "   - Reinstalled clean dependencies"
echo ""
echo "💾 Backups created:"
echo "   - package.json.backup"
echo "   - README.md.backup"
echo "   - eslint.config.mjs.backup (if applicable)"
echo "   - README.md.backup"
echo ""
echo "✨ Your project is now Storybook-free!"
