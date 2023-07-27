# utf8,utf16,utf32 编码规则

> 工具推荐：[进制转换](https://wcdha.com/tools/hex/) [unicode编码查看器](https://wcdha.com/tools/encoded/?page=0_1)  [ascii编码查看器](https://wcdha.com/tools/ascii/) [UTF编码转换](https://wcdha.com/tools/encoded/unicodeInfo)
## 什么是 utf8 

> 参考链接：[维基百科](https://zh.wikipedia.org/wiki/UTF-8) [阮一峰](https://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html)

> UTF-8（8-bit Unicode Transformation Format）是一种针对Unicode的可变长度字符编码，也是一种前缀码。它可以用一至四个字节对Unicode字符集中的所有有效编码点进行编码，属于Unicode标准的一部分,由于较小值的编码点一般使用频率较高，直接使用Unicode编码效率低下，大量浪费内存空间。UTF-8就是为了解决向后兼容ASCII码而设计。
+ 优点：兼容 ASCII。节省空间，可占用1-4个字节。
+ 缺点：UTF-8 的 ASCII 字符只占用一个字节，比较节省空间，但是更多字符的 UTF-8 编码占用的空间就要多出1/2，特别是中文、日文和韩文（CJK）这样的方块文字，它们大多需要三个字节。
### 编码规则
```
/**
 * utf 8 转换规则
 * 
    UniCode 16进制	            UTF8
    00000000 - 0000007F 0xxxxxxx
    00000080 - 000007FF	110xxxxx 10xxxxxx
    00000800 - 0000FFFF	1110xxxx 10xxxxxx 10xxxxxx
    00010000 - 001FFFFF	11110xxx 10xxxxxx 10xxxxxx 10xxxxxx

    1. 举例 “严” unicode 20005 16进制 4E25 二进制 100111000100101
    2. 查找组 16 进制转换 2 进制
         00000000 - 0000007F = 0 - 1111111
         00000080 - 000007FF = 10000000 - 11111111111
         00000800 - 0000FFFF = 100000000000-1111111111111111
         00010000 - 001FFFFF = 10000000000000000-111111111111111111111
   3. 根据2进制比较发现 “严” 在第三组 utf8 表达式为 1110xxxx 10xxxxxx 10xxxxxx
   4. “严” 2进制，依次从后填入，不足补0：1110xxxx 10xxxxxx 10xxxxxx 100111000100101
   5. “严” utf8 2进制为 11100100 10111000 10100101 16进制为 e4 b8 a5
 */

   const radixNum = (num, m, n) => {
    num = typeof num === "string" ? num : String(num);
    const _DEFAULT_ = {
       initNum: 10,
    };
    // 处理 m,n为0时转成10
    m = m === 0 ? _DEFAULT_.initNum : m;
    n = n === 0 ? _DEFAULT_.initNum : n;
    // 处理第三个参数n不传时, 转成10
    n = m && !n ? _DEFAULT_.initNum : n;
    // 判断radix区间
    let result = parseInt(num, m).toString(n);
    if (typeof result !== "string" && isNaN(result)) {
       return null;
    }
    return result;
 };
 
 // import { radixNum } from "../../utils/index"
 
 const UTF8_RULE = [
    { start: "0", end: "1111111", rule: ["0xxxxxxx"] },
    { start: "10000000", end: "11111111111", rule: ["110xxxxx", "10xxxxxx"] },
    { start: "100000000000", end: "1111111111111111", rule: ["1110xxxx", "10xxxxxx", "10xxxxxx"] },
    { start: "10000000000000000", end: "111111111111111111111", rule: ["11110xxx", "10xxxxxx", "10xxxxxx", "10xxxxxx"] },
 ]
 
 const groupFormat = (codeBinary, rule) => {
    const codeBinaryArr = codeBinary.split("")
    const result = [];
 
    for (let i = rule.length - 1; i >= 0; i--) {
       const xAll = rule[i].match(/x/g);
       const pre = rule[i].slice(0, rule[i].length - xAll.length)
       const ruleData = codeBinaryArr.splice(-xAll.length).join("").padStart(8 - pre.length, "0")
       const utf8Code = pre + ruleData
       result.unshift(utf8Code)
    }
 
    return result
 }
 
 const getUtf8 = () => {
 
    // 进制
    const char = "严"; // 𠮷
    const charCodePoint = char.codePointAt(0);
    const charCodeBinary = radixNum(charCodePoint, 10, 2)
    // 分组
    const groupIndex = UTF8_RULE.findIndex(v => charCodeBinary >= (v.start * 1) && charCodeBinary <= (v.end * 1));
    const group = UTF8_RULE[groupIndex];
    const utf8Binary = groupFormat(charCodeBinary, group.rule)
    return {
       binary: utf8Binary,
       hex: utf8Binary.map(v => radixNum(v, 2, 16).toUpperCase()),
       decBytes: utf8Binary.map(v => radixNum(v, 2, 10)),
       dec: radixNum(utf8Binary.join(""), 2, 10),
    }
 
 }
 console.log(getUtf8())
```

## 字节顺序标记（BOM）

> 参考链接：[参考链接](https://zh.wikipedia.org/zh-cn/%E4%BD%8D%E5%85%83%E7%B5%84%E9%A0%86%E5%BA%8F%E8%A8%98%E8%99%9F)

#### 是位于码点U+FEFF的统一码字符的名称。当以UTF-16或UTF-32来将UCS/统一码字符所组成的字符串编码时，这个字符被用来标示其字节序。它常被用来当做标示文件是以UTF-8、UTF-16或UTF-32编码的标记

```
    1. 字节顺序标记通常有几种涵义：
        . 在16位和32位的情况下，文字流的字节顺序。
        . 表示文字流非常有可能是Unicode编码。
        . 使用的是哪一种Unicode字符编码。
    2. 在UTF-16，UTF-32中，字节顺序标记被放置为文件或文字符串流的第一个字符，以标示在此文件或文字符串流中。防止字节读取错误，形成错误的字节。
    3. utf8 不需要加BOM，因为UTF-8 都具有相同的字节顺序，因此不需要字节顺序标记
    * BE，其后缀是 BE 即 big-endian，代表大端 ，就是将代码单元的编码从低位，也就是后一个字节开始赋值。例如：utf16-BE A 16进制为 FE FF 00 41
    * LE，其后缀是 LE 即 little-endian，代表小端，就是将代码单元的编码从高位，也就是前一个字节开始赋值。例如：utf16-LE A 16进制为 FF FE 41 00
    * 没有指定后缀，即不知道其是大小端，所以字节流开始的两个字节会表示大小端。即0XFE 0XFF表示大端，0XFF 0XFE表示小端。例如：A utf16 16进制为 FF FE 41 00 
```

## 什么是 utf16
> 参考链接：[参考链接](https://zh.wikipedia.org/wiki/UTF-16)

> UTF-16是Unicode字符编码五层次模型的第三层：字符编码表（Character Encoding Form，也称为"storage format"）的一种实现方式。即把Unicode字符集的抽象码位映射为16位长的整数（即码元）的序列，用于数据存储或传递。Unicode字符的码位，需要1个或者2个16位长的码元来表示，因此这是一个变长表示

+ 优点：中日韩采用2个字节。
+ 缺点：ASCII编码，也需要用到两个字符。
### 编码规则
```
/**
 * utf16 编码规则
 * 1. 从U+0000至U+D7FF以及从U+E000至U+FFFF的码位
 *    10进制为：0-55295 57344-65535
 *    例如：“严” unicode 20005 16进制 4E25，可见在0-55295 57344-65535区间，utf16编码为4E 25
 * 2.  从U + 10000到U + 10FFFF的码位
 *     十进制为：65536 - 1114111
 *     例如：“𐐷”的unicode 66615 16进制 10437 
 *     编码过程：
 *          1. 10437-10000=437 2进制为 10000110111
 *          2. 分割前10位，后10位，不足补0。前 00 0000 0001 后 00 0011 0111
 *          3. 添加 0xD800 到上值，以形成高位：0xD800 + 0x0001 = 0xD801
 *          4. 添加 0xDC00 到下值，以形成低位：0xDC00 + 0x0037 = 0xDC37
 *          5. “𐐷” UTF-16：D8 01 DC 37
 *          6. “𐐷” UTF-16BE：FE FF D8 01 DC 37
 *          7. “𐐷” UTF-16LE：FF FE 01 D8 37 DC
 */

const radixNum = (num, m, n) => {
    num = typeof num === "string" ? num : String(num);
    const _DEFAULT_ = {
        initNum: 10,
    };
    // 处理 m,n为0时转成10
    m = m === 0 ? _DEFAULT_.initNum : m;
    n = n === 0 ? _DEFAULT_.initNum : n;
    // 处理第三个参数n不传时, 转成10
    n = m && !n ? _DEFAULT_.initNum : n;
    // 判断radix区间
    let result = parseInt(num, m).toString(n);
    if (typeof result !== "string" && isNaN(result)) {
        return null;
    }
    return result;
};

/**
 * 字符串分割数组
 * @param {} str 字符串
 * @param  number num 分割位 
 * @returns 
 */
const stringSplit = (str, num = 2) => {
    const value = str.split("");
    const result = [];

    for (let i = 0; i < value.length; i++) {
        const _idx = i
        result.push(value.slice(i, _idx + num))
        i += num - 1
    }
    return result
}
// import { radixNum } from "../../utils/index"


const getUtf16 = (name = "𠮷") => {
    // 进制
    const char = name
    const result = [];
    let index = 0;
    while (index < char.length) {

        const charCode = char.charCodeAt(index);
        if (charCode >= 0xD800 && charCode <= 0xDBFF) {
            console.log("占用4个字节！")
        }
        const radix = radixNum(charCode, 10, 16);
        result.push(stringSplit(radix).map(v => v.join("").toUpperCase()))
        index++
    }

    const BE = result.reduce((pre, cur) => { pre = pre.concat(cur); return pre }, []);
    const LE = result.reduce((pre, cur) => { pre = pre.concat(cur); return pre }, []).reverse();

    return {
        BE: {
            binary: BE.map(v => radixNum(v, 16, 2).padStart(8, 0)),
            hex: BE,
            decBytes: BE.map(v => radixNum(v, 16, 10)),
            dec: radixNum(BE.join(""), 16, 10),
        },
        LE: {
            binary: LE.map(v => radixNum(v, 16, 2).padStart(8, 0)),
            hex: LE,
            decBytes: LE.map(v => radixNum(v, 16, 10)),
            dec: radixNum(LE.join(""), 16, 10),
        }
    }
}

console.log(getUtf16())
```

## 什么是 utf32
> 参考链接：[参考链接](https://zh.wikipedia.org/wiki/UTF-32)

> UTF-32是32位Unicode转换格式（Unicode Transformation Formats， 或UTF）的缩写。UTF-32是一种用于编码Unicode的协定，该协定使用32位比特对每个Unicode码位进行编码（但前导比特数必须为零，故仅能表示231个Unicode码位）。与其他可变长度的Unicode转换格式（UTF）相比，UTF-32编码长度是固定的，UTF-32中的每个32位值代表一个Unicode码位，并且与该码位的数值完全一致。

+ 优点：UTF-32的主要优点是可以直接由Unicode码位来索引。在编码序列中查找第N个编码是一个常数时间操作。
+ 缺点：UTF-32的主要缺点是每个码位使用四个字节，空间浪费较多。
### 编码规则：
```
/**
 * utf32 编码规则
 * UTF-32 让每个字符都以 32 比特，即 4 字节的长度来存储，位数不够就在前面补 0，32 比特足够表示 Unicode 中的所有字符。

 * 例如：
 *      1. “严” unicode 20005 16进制 4e25 2进制 100111000100101
 *      2. 已知utf32 采用4字节32比特，不足前面补0。
 *      3. 得到2进制为 00000000 00000000 01001110 00100101
 *      4. 得到16进制为 00      00       4E        25
 */

const radixNum = (num, m, n) => {
    num = typeof num === "string" ? num : String(num);
    const _DEFAULT_ = {
        initNum: 10,
    };
    // 处理 m,n为0时转成10
    m = m === 0 ? _DEFAULT_.initNum : m;
    n = n === 0 ? _DEFAULT_.initNum : n;
    // 处理第三个参数n不传时, 转成10
    n = m && !n ? _DEFAULT_.initNum : n;
    // 判断radix区间
    let result = parseInt(num, m).toString(n);
    if (typeof result !== "string" && isNaN(result)) {
        return null;
    }
    return result;
};

// import { radixNum } from "../../utils/index"

/**
 * 字符串分割数组
 * @param {} str 字符串
 * @param  number num 分割位 
 * @returns 
 */
const stringSplit = (str, num = 2) => {
    const value = str.padStart(8, "0").split("");
    const result = [];

    for (let i = 0; i < value.length; i++) {
        const _idx = i
        result.push(value.slice(i, _idx + num))
        i += num - 1
    }
    return result
}


const getUtf32 = (name = "严") => {
    // 进制
    const char = name
    const charCode = char.codePointAt(0);
    const radix = radixNum(charCode, 10, 16)
    const result = stringSplit(radix);

    const BE = result.reduce((pre, cur) => { pre = pre.concat(cur.join("").toUpperCase()); return pre }, []);
    const LE = result.reduce((pre, cur) => { pre = pre.concat(cur.join("").toUpperCase()); return pre }, []).reverse();
    return {
        BE: {
            binary: BE.map(v => radixNum(v, 16, 2).padStart(8, 0)),
            hex: BE,
            decBytes: BE.map(v => radixNum(v, 16, 10)),
            dec: radixNum(BE.join(""), 16, 10),
        },
        LE: {
            binary: LE.map(v => radixNum(v, 16, 2).padStart(8, 0)),
            hex: LE,
            decBytes: LE.map(v => radixNum(v, 16, 10)),
            dec: radixNum(LE.join(""), 16, 10),
        }
    }
}

console.log(getUtf32())
```
