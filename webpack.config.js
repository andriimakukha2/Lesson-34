const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // Режим розробки або продакшн
    mode: 'production', // Можна змінити на 'development' для розробки

    // Точка входу в додаток
    entry: './src/main.js',

    // Вихідний файл і хешування імен файлів для кешування
    output: {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[hash][ext][query]', // Для зображень та шрифтів
    },

    // Налаштування для роботи з різними типами файлів
    module: {
        rules: [
            // Обробка SCSS і CSS
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
            },

            // Обробка зображень
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                type: 'asset/resource',
            },

            // Підтримка шрифтів (woff, woff2, ttf, eot, otf)
            {
                test: /\.(woff(2)?|ttf|eot|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[hash][ext]'
                }
            },

            // JavaScript з підтримкою Babel для ES6+ синтаксису
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },

    // Плагіни для додаткової функціональності
    plugins: [
        // Очищення папки dist перед кожною збіркою
        new CleanWebpackPlugin(),

        // Витягування CSS в окремий файл з хешуванням
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),

        // Генерація HTML файлу з автоматичним підключенням JS та CSS файлів
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
    ],

    // Оптимізація для розділення бібліотек на окремі чанки
    optimization: {
        splitChunks: {
            chunks: 'all', // Це розділяє всі бібліотеки на окремі файли для кращої продуктивності
        }
    },

    // Налаштування devServer для локальної розробки
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true, // Включає стиснення для покращення продуктивності
        port: 9000, // Порт для локального сервера
    }
};
