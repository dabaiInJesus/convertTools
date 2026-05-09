# 测试数据生成指南

本文档提供所有测试用例所需的测试数据文件和生成方法。

---

## 📁 测试数据文件清单

### CSV 测试文件

#### 1. test_basic.csv
**用途**: 基础 CSV 转 JSON 测试（测试用例 1.1）

```csv
name,age,city
John,30,New York
Jane,25,London
Bob,35,Paris
```

**创建方法**:
```bash
cat > test_basic.csv << EOF
name,age,city
John,30,New York
Jane,25,London
Bob,35,Paris
EOF
```

---

#### 2. test_special_chars.csv
**用途**: 特殊字符处理测试（测试用例 1.2）

```csv
name,description,value
"Smith, John","He said ""Hello""",100
"O'Brien","It's a test",200
"Test, with, commas","Normal text",300
```

---

#### 3. test_empty_values.csv
**用途**: 空值处理测试（测试用例 1.3）

```csv
name,age,city,email
John,30,,john@example.com
Jane,,London,
Bob,35,Paris,bob@example.com
,25,,
```

---

#### 4. test_products.csv
**用途**: 产品数据测试（测试用例 1.5）

```csv
product,price,quantity
Apple,1.5,100
Banana,0.8,200
Orange,2.0,150
```

---

#### 5. test_employees.csv
**用途**: CSV 转 Excel 测试（测试用例 3.1）

```csv
employee_id,name,department,salary
E001,Alice,Engineering,80000
E002,Bob,Marketing,65000
E003,Charlie,Sales,70000
```

---

#### 6. test_header_only.csv
**用途**: 只有表头的边界测试（测试用例 10.4）

```csv
name,age,city
```

---

#### 7. test_empty.csv
**用途**: 空文件测试（测试用例 10.1）

*(创建一个完全空的文件)*

```bash
touch test_empty.csv
```

---

### JSON 测试文件

#### 1. test_basic.json
**用途**: JSON 转 CSV 测试（测试用例 1.4）

```json
[
  {"name": "John", "age": 30, "city": "New York"},
  {"name": "Jane", "age": 25, "city": "London"},
  {"name": "Bob", "age": 35, "city": "Paris"}
]
```

---

#### 2. test_products.json
**用途**: JSON 转 Excel 测试（测试用例 2.3）

```json
[
  {"id": 1, "name": "Product A", "price": 100},
  {"id": 2, "name": "Product B", "price": 200},
  {"id": 3, "name": "Product C", "price": 300}
]
```

---

#### 3. test_items.json
**用途**: JSON 转 XML 测试（测试用例 4.1）

```json
[
  {"name": "John", "age": 30, "city": "New York"},
  {"name": "Jane", "age": 25, "city": "London"}
]
```

---

#### 4. test_special_chars.json
**用途**: XML 特殊字符测试（测试用例 4.3）

```json
[
  {"message": "Tom & Jerry", "note": "Price < $100", "desc": "It's \"good\""}
]
```

---

#### 5. test_invalid.json
**用途**: 无效 JSON 测试（测试用例 10.2）

```json
{invalid json content
```

---

### XML 测试文件

#### 1. test_basic.xml
**用途**: XML 转 JSON 测试（测试用例 4.2）

```xml
<?xml version="1.0" encoding="UTF-8"?>
<root>
  <item>
    <product>Laptop</product>
    <price>999.99</price>
    <stock>50</stock>
  </item>
  <item>
    <product>Mouse</product>
    <price>29.99</price>
    <stock>200</stock>
  </item>
</root>
```

---

#### 2. test_invalid.xml
**用途**: 无效 XML 测试（测试用例 4.4）

```xml
<root>
  <item>
    <name>Test
  </item>
</root>
```

---

### Excel 测试文件

由于 Excel 文件是二进制格式，需要手动创建或使用脚本生成。

#### 1. test_data.xlsx
**用途**: Excel 转 JSON 测试（测试用例 2.1）

**内容**:

| name | age | city |
|------|-----|------|
| John | 30 | New York |
| Jane | 25 | London |
| Bob | 35 | Paris |

**创建方法**:
1. 打开 Microsoft Excel 或 Google Sheets
2. 输入上述数据
3. 保存为 `.xlsx` 格式

---

#### 2. test_types.xlsx
**用途**: 多种数据类型测试（测试用例 2.4）

**内容**:

| id | name | price | date | active |
|----|------|-------|------|--------|
| 1 | Item A | 10.5 | 2026-01-01 | TRUE |
| 2 | Item B | 20.0 | 2026-02-15 | FALSE |
| 3 | Item C | 30.75 | 2026-03-20 | TRUE |

---

### 批量测试文件

#### batch_file_1.csv
```csv
id,name,value
1,Item1,100
2,Item2,200
```

#### batch_file_2.csv
```csv
id,name,value
3,Item3,300
4,Item4,400
5,Item5,500
```

#### batch_file_3.csv
```csv
id,name,value
6,Item6,600
```

---

### 文本工具测试数据

#### Base64 测试
```
原文: Hello World
预期: SGVsbG8gV29ybGQ=
```

```
原文: 你好世界
预期: 5L2g5aW95LiW55WM
```

#### URL 编码测试
```
原文: https://example.com/path?name=John&age=30
预期: https%3A%2F%2Fexample.com%2Fpath%3Fname%3DJohn%26age%3D30
```

---

## 🔧 测试数据生成脚本

### Python 脚本生成大量测试数据

```python
# generate_test_data.py
import csv
import json
import random
import string

def generate_large_csv(filename, rows=1000):
    """生成大型 CSV 文件用于性能测试"""
    with open(filename, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['id', 'name', 'email', 'value'])
        
        for i in range(1, rows + 1):
            name = ''.join(random.choices(string.ascii_letters, k=10))
            email = f"{name.lower()}@example.com"
            value = round(random.uniform(1, 1000), 2)
            writer.writerow([i, name, email, value])
    
    print(f"Generated {filename} with {rows} rows")

def generate_test_json(filename, items=100):
    """生成测试用 JSON 文件"""
    data = []
    for i in range(1, items + 1):
        data.append({
            "id": i,
            "name": f"Item {i}",
            "value": round(random.uniform(1, 100), 2),
            "active": random.choice([True, False])
        })
    
    with open(filename, 'w') as f:
        json.dump(data, f, indent=2)
    
    print(f"Generated {filename} with {items} items")

if __name__ == "__main__":
    # 生成不同大小的测试文件
    generate_large_csv('test_small.csv', 100)      # ~10KB
    generate_large_csv('test_medium.csv', 1000)    # ~100KB
    generate_large_csv('test_large.csv', 10000)    # ~1MB
    
    generate_test_json('test_data.json', 100)
    generate_test_json('test_data_large.json', 1000)
```

**运行脚本**:
```bash
python generate_test_data.py
```

---

### Node.js 脚本生成测试数据

```javascript
// generate_test_data.js
const fs = require('fs');
const path = require('path');

function generateCSV(filename, rows) {
    let csv = 'id,name,email,value\n';
    
    for (let i = 1; i <= rows; i++) {
        const name = `User${i}`;
        const email = `user${i}@example.com`;
        const value = (Math.random() * 1000).toFixed(2);
        csv += `${i},${name},${email},${value}\n`;
    }
    
    fs.writeFileSync(filename, csv);
    console.log(`Generated ${filename} with ${rows} rows`);
}

function generateJSON(filename, items) {
    const data = [];
    
    for (let i = 1; i <= items; i++) {
        data.push({
            id: i,
            name: `Item ${i}`,
            value: parseFloat((Math.random() * 100).toFixed(2)),
            active: Math.random() > 0.5
        });
    }
    
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
    console.log(`Generated ${filename} with ${items} items`);
}

// 生成测试文件
generateCSV('test_perf_1mb.csv', 10000);
generateCSV('test_perf_5mb.csv', 50000);
generateJSON('test_perf.json', 1000);
```

**运行脚本**:
```bash
node generate_test_data.js
```

---

## 📏 文件大小验证

### 检查生成的文件大小

```bash
# Linux/Mac
ls -lh test_*.csv
ls -lh test_*.json

# Windows PowerShell
Get-ChildItem test_*.csv | Select-Object Name, Length
Get-ChildItem test_*.json | Select-Object Name, Length
```

### 预期文件大小

| 文件名 | 行数 | 预期大小 |
|--------|------|---------|
| test_basic.csv | 3 | ~100 B |
| test_small.csv | 100 | ~5 KB |
| test_medium.csv | 1000 | ~50 KB |
| test_large.csv | 10000 | ~500 KB |
| test_perf_1mb.csv | ~20000 | ~1 MB |
| test_perf_5mb.csv | ~100000 | ~5 MB |

---

## 🎯 测试数据使用指南

### 1. 组织测试数据目录

```
test-data/
├── csv/
│   ├── test_basic.csv
│   ├── test_special_chars.csv
│   ├── test_empty_values.csv
│   └── ...
├── json/
│   ├── test_basic.json
│   ├── test_products.json
│   └── ...
├── xml/
│   ├── test_basic.xml
│   └── test_invalid.xml
├── excel/
│   ├── test_data.xlsx
│   └── test_types.xlsx
└── batch/
    ├── batch_file_1.csv
    ├── batch_file_2.csv
    └── batch_file_3.csv
```

### 2. 快速设置测试环境

```bash
# 创建测试数据目录
mkdir -p test-data/{csv,json,xml,excel,batch}

# 复制测试文件到对应目录
cp test_basic.csv test-data/csv/
cp test_basic.json test-data/json/
# ... 其他文件
```

### 3. 自动化测试脚本示例

```bash
#!/bin/bash
# run_tests.sh

echo "Running convertTools tests..."

# 测试 CSV 转 JSON
echo "Test 1: CSV to JSON"
# 手动步骤：上传 test_basic.csv，验证输出

# 测试 JSON 转 CSV
echo "Test 2: JSON to CSV"
# 手动步骤：粘贴 test_basic.json 内容，验证输出

# 测试批量转换
echo "Test 3: Batch Convert"
# 手动步骤：选择 batch/*.csv 文件，转换为 JSON

echo "All tests completed!"
```

---

## 📝 测试数据验证清单

在开始正式测试前，验证所有测试数据：

- [ ] test_basic.csv - 3 行数据，无特殊字符
- [ ] test_special_chars.csv - 包含逗号、引号
- [ ] test_empty_values.csv - 包含空字段
- [ ] test_products.csv - 产品数据
- [ ] test_employees.csv - 员工数据
- [ ] test_header_only.csv - 只有表头
- [ ] test_empty.csv - 空文件
- [ ] test_basic.json - 3 个对象
- [ ] test_products.json - 产品 JSON
- [ ] test_items.json - 用于 XML 转换
- [ ] test_special_chars.json - 特殊字符
- [ ] test_invalid.json - 无效 JSON
- [ ] test_basic.xml - 标准 XML
- [ ] test_invalid.xml - 无效 XML
- [ ] test_data.xlsx - Excel 文件
- [ ] test_types.xlsx - 多类型数据
- [ ] batch_file_1.csv - 批量测试文件 1
- [ ] batch_file_2.csv - 批量测试文件 2
- [ ] batch_file_3.csv - 批量测试文件 3

---

## 🔍 测试数据质量检查

### CSV 文件检查

```bash
# 检查 CSV 格式
head -5 test_basic.csv

# 检查行数
wc -l test_basic.csv

# 检查编码
file test_basic.csv
```

### JSON 文件检查

```bash
# 验证 JSON 格式
cat test_basic.json | python -m json.tool

# 或使用 jq
jq . test_basic.json
```

### XML 文件检查

```bash
# 验证 XML 格式（需要 xmllint）
xmllint --noout test_basic.xml
```

---

## 💡 测试提示

1. **保持一致性**: 使用相同的测试数据进行回归测试
2. **版本控制**: 将测试数据纳入 Git 管理
3. **文档化**: 记录每个测试文件的用途
4. **自动化**: 尽可能使用脚本生成和验证测试数据
5. **边界值**: 包含正常、边界、异常三种情况的数据

---

**测试数据版本**: v1.0  
**创建日期**: 2026-05-09  
**维护者**: convertTools Team
