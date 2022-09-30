module.exports = {
  // commit类型选择
  types: [
    { value: 'feat',   name: 'feat:  新功能开发' },
    { value: 'bug',    name: 'fix:   bug修复' },
    { value: 'test',   name: 'test:  测试功能' },
    { value: 'style',  name: 'style: 代码样式调整' },
  ],
  allowCustomScopes: false,
  allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ['scope', 'footer'],
  // 命令行交互信息
  messages: {
    type: '选择你的提交类型\n',
    scope: '选择你的改变范围:\n',
    // used if allowCustomScopes is true
    customScope: '填写改变范围:',
    subject: '填写简洁的描述信息:\n',
    body: '填写详细的描述，可以使用 | 进行换行:\n',
    breaking: '列举有破坏性的改变:\n',
    footer: '列举关闭的issue. E.g.: #31, #34:\n',
    confirmCommit: '你确定要提交本次更改?',
  }
}