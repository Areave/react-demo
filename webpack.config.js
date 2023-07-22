const path = require("path");
const MiniCss = require('mini-css-extract-plugin');

module.exports = function (_, webpackEnv) {
    const isDevelopment = webpackEnv.mode === 'development';
    const isProduction = webpackEnv.mode === 'production';

    const miniCss = new MiniCss({
        filename: 'style.css'
    });

    const getStyleLoaders = () => {
        return [
            isDevelopment && 'style-loader',
            isProduction && MiniCss.loader,
            {
                loader: 'css-loader',
                options: {
                    esModule: true,
                    sourceMap: isDevelopment,
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                        plugins: ['autoprefixer']
                    }
                }
            },
            {
                loader: 'sass-loader',
                options: {
                    implementation: require('sass'),
                    sourceMap: isDevelopment
                }
            }
        ].filter(Boolean);

    };

    return {
        entry: "./index.js",
        output: {
            path: path.resolve(__dirname, "public"),
            filename: "main.js"
        },
        target: "web",
        devServer: {
            port: "5000",
            static: ["./public"],
            open: true,
            hot: true ,
            liveReload: true
        },
        resolve: {
            extensions: ['.js','.jsx','.json']
        },
        module:{
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use:  'babel-loader'
                },
                {
                    test: /\.s?css$/,
                    use: getStyleLoaders()
                }
            ]
        },
        plugins: [miniCss],
    }
}