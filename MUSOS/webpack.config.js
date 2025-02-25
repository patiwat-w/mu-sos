const path = require('path');

module.exports = {
  entry: './src/index.tsx', // จุดเริ่มต้นของโปรเจค
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // สำหรับไฟล์ TypeScript และ TSX
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.module\.css$/, // สำหรับไฟล์ CSS Modules
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            modules: true,
          },
        }],
      },
      {
        test: /\.css$/, // สำหรับไฟล์ CSS ทั่วไป
        exclude: /\.module\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};