#!/usr/bin/env bash

ios_version_number=`sed -n '/MARKETING_VERSION/{s/MARKETING_VERSION = //;s/;//;s/^[[:space:]]*//;p;q;}' ./ios/MotusiMobileApp.xcodeproj/project.pbxproj`
ios_build_number=`sed -n '/CURRENT_PROJECT_VERSION/{s/CURRENT_PROJECT_VERSION = //;s/;//;s/^[[:space:]]*//;p;q;}' ./ios/MotusiMobileApp.xcodeproj/project.pbxproj`

echo "iOS Version: $ios_version_number($ios_build_number)"

android_version_number=`sed -n '/versionName/{s/versionName//;s/;//;s/"//g;s/^[[:space:]]*//;p;q;}' ./android/app/build.gradle`
android_build_number=`sed -n '/versionCode/{s/versionCode//;s/;//;s/^[[:space:]]*//;p;q;}' ./android/app/build.gradle`

echo "Android Version: $android_version_number($android_build_number)"