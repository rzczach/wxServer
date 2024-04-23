module.exports = {
    apps : [{
      name: 'my-project',
      script: './src/app.ts',
      watch: true,
      ignore_watch: ['node_modules'],
      interpreter: 'ts-node',
      env: {
        NODE_ENV: 'development', // 或者 'production'
        // ... 添加其他环境变量
      },
      env_production: {
        NODE_ENV: 'production',
        // 在生产环境中可能需要不同的配置，如数据库连接池大小等
      },
    }],
  };