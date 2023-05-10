// 特殊字符校验
export function specialCn(rule, value, callback) {
  if (value === undefined || value === '') {
    return callback();
  }
  const reg = /^[0-9a-zA-Z._#$*,()\u4e00-\u9fa5\s-]+$/;
  if (!reg.test(value)) {
    return callback(new Error('只允许横杠、下划线、空格、#、$、*、英文句号逗号小括号及字母、数字和汉字的组合'));
  }
  return callback();
}

export function special(rule, value, callback) {
  if (value === undefined || value === '') {
    return callback();
  }
  const reg = /^[0-9a-zA-Z._#$*,()\s-]+$/;
  if (!reg.test(value)) {
    return callback(new Error('只允许横杠、下划线、空格、#、$、*、英文句号逗号小括号及字母、数字的组合'));
  }
  return callback();
}

export const U_LIST = [
  {
    sn: 1, // 序号
    status: 2, // U状态
    lightStatus: 'none',
  },
  {
    sn: '2', // 序号
    status: 5, // U状态
    lightStatus: 'none',
  },
  {
    sn: 3, // 序号
    status: 5, // U状态
    lightStatus: 'none',
  },
  {
    sn: 4, // 序号
    status: 3, // U状态
    lightStatus: 'none',
  },
  {
    sn: 5, // 序号
    status: 5, // U状态
    lightStatus: 'none',
  },
  {
    sn: 6, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
  {
    sn: 7, // 序号
    status: 5, // U状态
    lightStatus: 'none',
  },
  {
    sn: 8, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
  {
    sn: 9, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
  {
    sn: 10, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
  {
    sn: 11, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
  {
    sn: 12, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
  {
    sn: 13, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
  {
    sn: 14, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
  {
    sn: 15, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
  {
    sn: 16, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
  {
    sn: 17, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
  {
    sn: 18, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
  {
    sn: 19, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
  {
    sn: 20, // 序号
    status: 5, // U状态
    lightStatus: 'none',
  },
  {
    sn: 21, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
  {
    sn: 22, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
  {
    sn: 23, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
  {
    sn: 24, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
  {
    sn: 25, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
  {
    sn: 26, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
  {
    sn: 27, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
  {
    sn: 28, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
  {
    sn: 29, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
  {
    sn: 30, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
  {
    sn: 31, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
  {
    sn: 32, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
  {
    sn: 33, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
  {
    sn: 34, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
  {
    sn: 35, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
  {
    sn: 36, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
  {
    sn: 37, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
  {
    sn: 38, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
  {
    sn: 39, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
  {
    sn: 40, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
  {
    sn: 41, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
  {
    sn: 42, // 序号
    status: 4, // U状态
    lightStatus: 'none',
  },
];
