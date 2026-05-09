@echo off
REM convertTools 自动化测试脚本 (Windows 版本)
REM 此脚本帮助快速验证基本功能

echo ==========================================
echo   convertTools v2.0.0 自动化测试
echo ==========================================
echo.

set PASS=0
set FAIL=0
set SKIP=0

REM 函数：打印测试结果
:print_result
if %1==0 (
    echo [PASS] %~2
    set /a PASS+=1
) else (
    echo [FAIL] %~2
    set /a FAIL+=1
)
goto :eof

:print_skip
echo [SKIP] %~1
set /a SKIP+=1
goto :eof

echo 📋 检查测试环境...
echo.

REM 1. 检查 Node.js
echo 1. 检查 Node.js...
where node >nul 2>&1
if %errorlevel%==0 (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    call :print_result 0 "Node.js 已安装: !NODE_VERSION!"
) else (
    call :print_result 1 "Node.js 未安装"
)

REM 2. 检查 npm
echo 2. 检查 npm...
where npm >nul 2>&1
if %errorlevel%==0 (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    call :print_result 0 "npm 已安装: !NPM_VERSION!"
) else (
    call :print_result 1 "npm 未安装"
)

REM 3. 检查项目文件
echo 3. 检查项目文件...
if exist "package.json" (
    call :print_result 0 "package.json 存在"
) else (
    call :print_result 1 "package.json 缺失"
)

if exist "src\App.vue" (
    call :print_result 0 "App.vue 存在"
) else (
    call :print_result 1 "App.vue 缺失"
)

if exist "vite.config.ts" (
    call :print_result 0 "vite.config.ts 存在"
) else (
    call :print_result 1 "vite.config.ts 缺失"
)

REM 4. 检查依赖
echo 4. 检查依赖安装...
if exist "node_modules" (
    call :print_result 0 "node_modules 目录存在"
    
    if exist "node_modules\vue" (
        call :print_result 0 "Vue 已安装"
    ) else (
        call :print_result 1 "Vue 未安装"
    )
    
    if exist "node_modules\xlsx" (
        call :print_result 0 "SheetJS (xlsx) 已安装"
    ) else (
        call :print_result 1 "SheetJS (xlsx) 未安装"
    )
    
    if exist "node_modules\jszip" (
        call :print_result 0 "JSZip 已安装"
    ) else (
        call :print_result 1 "JSZip 未安装"
    )
) else (
    call :print_result 1 "node_modules 目录缺失，请运行 npm install"
)

REM 5. 构建测试
echo 5. 构建测试...
echo    执行 npm run build...
call npm run build > build.log 2>&1
if %errorlevel%==0 (
    call :print_result 0 "构建成功"
    
    if exist "dist" (
        call :print_result 0 "dist 目录生成"
        
        if exist "dist\index.html" (
            call :print_result 0 "index.html 生成"
        ) else (
            call :print_result 1 "index.html 缺失"
        )
        
        dir /b dist\assets\*.js >nul 2>&1
        if %errorlevel%==0 (
            call :print_result 0 "JavaScript 文件生成"
        ) else (
            call :print_result 1 "JavaScript 文件缺失"
        )
        
        dir /b dist\assets\*.css >nul 2>&1
        if %errorlevel%==0 (
            call :print_result 0 "CSS 文件生成"
        ) else (
            call :print_result 1 "CSS 文件缺失"
        )
    ) else (
        call :print_result 1 "dist 目录未生成"
    )
) else (
    call :print_result 1 "构建失败，查看 build.log"
)

REM 6. 文档检查
echo 6. 文档完整性检查...
set DOCS=README.md CHANGELOG.md QUICKSTART.md TEST_CASES.md TEST_DATA.md TEST_RESULTS_TEMPLATE.md PROJECT_SUMMARY.md

for %%doc in (%DOCS%) do (
    if exist "%%doc" (
        call :print_result 0 "%%doc 存在"
    ) else (
        call :print_result 1 "%%doc 缺失"
    )
)

REM 7. Git 状态检查
echo 7. Git 状态检查...
where git >nul 2>&1
if %errorlevel%==0 (
    git rev-parse --git-dir >nul 2>&1
    if %errorlevel%==0 (
        call :print_result 0 "Git 仓库初始化"
        
        git status --porcelain > git_status.txt 2>&1
        for %%F in (git_status.txt) do set SIZE=%%~zF
        if !SIZE! GTR 0 (
            echo [WARN] 有未提交的更改
        ) else (
            call :print_result 0 "工作区干净"
        )
        del git_status.txt
    ) else (
        call :print_skip "不是 Git 仓库"
    )
) else (
    call :print_skip "Git 未安装"
)

REM 总结
echo.
echo ==========================================
echo   测试总结
echo ==========================================
echo   通过: %PASS%
echo   失败: %FAIL%
echo   跳过: %SKIP%
echo ==========================================

set /a TOTAL=%PASS% + %FAIL% + %SKIP%
if %TOTAL% GTR 0 (
    set /a RATE=%PASS% * 100 / %TOTAL%
    echo   通过率: %RATE%%%
)
echo.

if %FAIL% EQU 0 (
    echo ✓ 所有检查通过！项目状态良好。
    exit /b 0
) else if %FAIL% LEQ 3 (
    echo ⚠ 存在少量问题，建议修复。
    exit /b 1
) else (
    echo ✗ 存在多个问题，需要立即处理！
    exit /b 2
)
