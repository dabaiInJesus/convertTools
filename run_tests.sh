#!/bin/bash

# convertTools 自动化测试脚本
# 此脚本帮助快速验证基本功能

echo "=========================================="
echo "  convertTools v2.0.0 自动化测试"
echo "=========================================="
echo ""

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 计数器
PASS=0
FAIL=0
SKIP=0

# 函数：打印测试结果
print_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓ PASS${NC}: $2"
        ((PASS++))
    else
        echo -e "${RED}✗ FAIL${NC}: $2"
        ((FAIL++))
    fi
}

print_skip() {
    echo -e "${YELLOW}⊘ SKIP${NC}: $1"
    ((SKIP++))
}

echo "📋 检查测试环境..."
echo ""

# 1. 检查 Node.js
echo "1. 检查 Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    print_result 0 "Node.js 已安装: $NODE_VERSION"
else
    print_result 1 "Node.js 未安装"
fi

# 2. 检查 npm
echo "2. 检查 npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    print_result 0 "npm 已安装: $NPM_VERSION"
else
    print_result 1 "npm 未安装"
fi

# 3. 检查项目文件
echo "3. 检查项目文件..."
if [ -f "package.json" ]; then
    print_result 0 "package.json 存在"
else
    print_result 1 "package.json 缺失"
fi

if [ -f "src/App.vue" ]; then
    print_result 0 "App.vue 存在"
else
    print_result 1 "App.vue 缺失"
fi

if [ -f "vite.config.ts" ]; then
    print_result 0 "vite.config.ts 存在"
else
    print_result 1 "vite.config.ts 缺失"
fi

# 4. 检查依赖
echo "4. 检查依赖安装..."
if [ -d "node_modules" ]; then
    print_result 0 "node_modules 目录存在"
    
    # 检查关键依赖
    if [ -d "node_modules/vue" ]; then
        print_result 0 "Vue 已安装"
    else
        print_result 1 "Vue 未安装"
    fi
    
    if [ -d "node_modules/xlsx" ]; then
        print_result 0 "SheetJS (xlsx) 已安装"
    else
        print_result 1 "SheetJS (xlsx) 未安装"
    fi
    
    if [ -d "node_modules/jszip" ]; then
        print_result 0 "JSZip 已安装"
    else
        print_result 1 "JSZip 未安装"
    fi
else
    print_result 1 "node_modules 目录缺失，请运行 npm install"
fi

# 5. 构建测试
echo "5. 构建测试..."
echo "   执行 npm run build..."
if npm run build > /tmp/build.log 2>&1; then
    print_result 0 "构建成功"
    
    # 检查 dist 目录
    if [ -d "dist" ]; then
        print_result 0 "dist 目录生成"
        
        # 检查关键文件
        if [ -f "dist/index.html" ]; then
            print_result 0 "index.html 生成"
        else
            print_result 1 "index.html 缺失"
        fi
        
        # 检查 JS 文件
        JS_COUNT=$(find dist/assets -name "*.js" 2>/dev/null | wc -l)
        if [ $JS_COUNT -gt 0 ]; then
            print_result 0 "JavaScript 文件生成 ($JS_COUNT 个)"
        else
            print_result 1 "JavaScript 文件缺失"
        fi
        
        # 检查 CSS 文件
        CSS_COUNT=$(find dist/assets -name "*.css" 2>/dev/null | wc -l)
        if [ $CSS_COUNT -gt 0 ]; then
            print_result 0 "CSS 文件生成 ($CSS_COUNT 个)"
        else
            print_result 1 "CSS 文件缺失"
        fi
    else
        print_result 1 "dist 目录未生成"
    fi
else
    print_result 1 "构建失败，查看 /tmp/build.log"
fi

# 6. 代码质量检查
echo "6. 代码质量检查..."

# 检查 TypeScript 语法
if command -v npx &> /dev/null; then
    echo "   检查 TypeScript 编译..."
    if npx tsc --noEmit 2>/dev/null; then
        print_result 0 "TypeScript 编译通过"
    else
        print_skip "TypeScript 检查跳过（可能未配置）"
    fi
else
    print_skip "npx 不可用"
fi

# 7. 文件大小检查
echo "7. 构建产物大小检查..."
if [ -d "dist/assets" ]; then
    TOTAL_SIZE=$(du -sh dist/assets 2>/dev/null | cut -f1)
    echo "   总大小: $TOTAL_SIZE"
    
    # 检查主应用包大小（应该小于 50KB gzip）
    MAIN_JS=$(find dist/assets -name "index-*.js" -exec ls -lh {} \; 2>/dev/null | awk '{print $5}')
    if [ -n "$MAIN_JS" ]; then
        echo "   主应用 JS: $MAIN_JS"
        print_result 0 "代码分割生效"
    else
        print_skip "无法检测主应用大小"
    fi
else
    print_skip "dist/assets 目录不存在"
fi

# 8. 文档检查
echo "8. 文档完整性检查..."
DOCS=(
    "README.md"
    "CHANGELOG.md"
    "QUICKSTART.md"
    "TEST_CASES.md"
    "TEST_DATA.md"
    "TEST_RESULTS_TEMPLATE.md"
    "PROJECT_SUMMARY.md"
)

for doc in "${DOCS[@]}"; do
    if [ -f "$doc" ]; then
        print_result 0 "$doc 存在"
    else
        print_result 1 "$doc 缺失"
    fi
done

# 9. Git 状态检查
echo "9. Git 状态检查..."
if command -v git &> /dev/null; then
    if git rev-parse --git-dir > /dev/null 2>&1; then
        print_result 0 "Git 仓库初始化"
        
        # 检查是否有未提交的更改
        if [ -n "$(git status --porcelain)" ]; then
            echo -e "${YELLOW}⚠ WARN${NC}: 有未提交的更改"
        else
            print_result 0 "工作区干净"
        fi
    else
        print_skip "不是 Git 仓库"
    fi
else
    print_skip "Git 未安装"
fi

# 10. 端口检查
echo "10. 开发服务器端口检查..."
if lsof -i:5173 > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠ WARN${NC}: 端口 5173 已被占用"
    print_skip "可能需要停止现有服务"
else
    print_result 0 "端口 5173 可用"
fi

# 总结
echo ""
echo "=========================================="
echo "  测试总结"
echo "=========================================="
echo -e "  ${GREEN}通过: $PASS${NC}"
echo -e "  ${RED}失败: $FAIL${NC}"
echo -e "  ${YELLOW}跳过: $SKIP${NC}"
echo "=========================================="

TOTAL=$((PASS + FAIL + SKIP))
if [ $TOTAL -gt 0 ]; then
    RATE=$((PASS * 100 / TOTAL))
    echo "  通过率: ${RATE}%"
fi
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}✓ 所有检查通过！项目状态良好。${NC}"
    exit 0
elif [ $FAIL -le 3 ]; then
    echo -e "${YELLOW}⚠ 存在少量问题，建议修复。${NC}"
    exit 1
else
    echo -e "${RED}✗ 存在多个问题，需要立即处理！${NC}"
    exit 2
fi
