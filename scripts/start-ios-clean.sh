#!/bin/bash

# 📱 React Native iOS - Full Automated Startup Script
# This script does EVERYTHING: clean, build, and launch simulator

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Get project root directory (parent of scripts folder)
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
IOS_DIR="$PROJECT_ROOT/ios"

echo -e "${BLUE}📱 Starting React Native iOS (Full Clean + Build + Launch)${NC}\n"

# Step 0: Kill ALL existing processes (Xcode, Metro, Simulator background tasks)
echo -e "${YELLOW}🔪 Killing existing processes...${NC}"
pkill -f "Xcode" || true
pkill -f "xcodebuild" || true
pkill -f "Metro" || true
pkill -f "expo start" || true
pkill -f "react-native start" || true
pkill -f "node.*metro" || true
lsof -ti:8080 2>/dev/null | xargs kill -9 2>/dev/null || true
lsof -ti:8081 2>/dev/null | xargs kill -9 2>/dev/null || true
echo -e "${GREEN}✓ Killed all processes${NC}\n"

# Step 1: Clean iOS build artifacts
echo -e "${YELLOW}📦 Cleaning iOS build artifacts...${NC}"
cd "$IOS_DIR"
rm -rf Pods Podfile.lock build
echo -e "${GREEN}✓ Removed Pods, Podfile.lock, and build folders${NC}\n"

# Step 2: Clean DerivedData (generic wildcard for any app)
echo -e "${YELLOW}🗑️  Cleaning DerivedData...${NC}"
sudo rm -rf ~/Library/Developer/Xcode/DerivedData/* 2>/dev/null || \
  rm -rf ~/Library/Developer/Xcode/DerivedData/* 2>/dev/null || true
echo -e "${GREEN}✓ Removed DerivedData${NC}\n"

# Step 3: Clean pod cache
echo -e "${YELLOW}🧹 Cleaning pod cache...${NC}"
pod cache clean --all
echo -e "${GREEN}✓ Cleaned pod cache${NC}\n"

# Step 4: Install pods
echo -e "${YELLOW}📥 Installing pods...${NC}"
pod install
echo -e "${GREEN}✓ Pods installed successfully${NC}\n"

# Step 5: Return to project root
cd "$PROJECT_ROOT"

# Step 6: Build and launch simulator (Expo handles Metro automatically)
echo -e "${BLUE}🏗️  Building and launching iOS simulator...${NC}"
echo -e "${YELLOW}   Expo will start Metro bundler automatically${NC}"
echo -e "${YELLOW}   This may take 2-3 minutes...${NC}\n"

# Use npx expo run:ios which handles everything automatically
npx expo run:ios --port 8080

echo -e "\n${GREEN}✅ SUCCESS! App is running in simulator${NC}\n"
echo -e "${BLUE}📊 Useful commands:${NC}"
echo -e "${YELLOW}   • Reload app:${NC} Cmd+R in simulator"
echo -e "${YELLOW}   • Dev menu:${NC} Cmd+D in simulator"
echo -e "${YELLOW}   • View Metro:${NC} Check terminal output above\n"
