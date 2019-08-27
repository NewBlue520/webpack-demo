const presets = [
    [
        "@babel/preset-env",
        {
            targets: {
                browsers: [
                    "last 1 version",
                    "> 1%",
                    "maintained node versions",
                    "not dead"
                ]
            },
            useBuiltIns: "usage", // 垫片使用
            corejs: 2
        }
    ]
    ]
;
const plugins = [

];
module.exports = {
    presets,
    plugins
};
