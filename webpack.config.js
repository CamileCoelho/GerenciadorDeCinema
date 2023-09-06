const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
//const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production', 
  // O ponto de entrada da aplicação
  entry: {
    index: path.resolve(__dirname, 'src/views', 'filmes-listagem', 'filmes-listagem.ts'),
    detalhes: path.resolve(__dirname, 'src/views', 'filmes-detalhes', 'filmes-detalhes.ts'),
  },

  // Configuração de output do build
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }      
    ]
  },

  // aliases
  resolve: {
    extensions: ['.ts', '.js', '.css'],

    alias: {
      assets: path.resolve(__dirname, 'src/assets')
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/views', 'filmes-listagem', 'filmes-listagem.html'),
      chunks: ['index']
    }),
    
    new HtmlWebpackPlugin({
      filename: 'filmes-detalhes.html',
      template: path.resolve(__dirname, 'src/views', 'filmes-detalhes', 'filmes-detalhes.html'),
      chunks: ['detalhes']
    }),
    
    // new CopyWebpackPlugin({
    //   patterns: [
    //     { from: 'src/assets', to: 'assets' }
    //   ]
    // })
  ],

  // Ambiente de desenvolvimento
  devtool: 'source-map',
  
  devServer: {
    liveReload: true,
    port: 8080,
    static: {
      directory: path.resolve(__dirname, 'dist')
    },
    watchFiles: {
      paths: ['src']
    }
  },

  //Otimação
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};