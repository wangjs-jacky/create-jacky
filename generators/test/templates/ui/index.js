"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
exports.default = (api) => {
    const { callRemote } = api;
    function PluginPanel() {
        return (<div style={{ padding: 20 }}>
        <antd_1.Button type="primary" onClick={async () => {
                const { data } = await callRemote({
                    type: 'org.xiaohuoni.demo.test',
                });
                alert(data);
            }}>Test</antd_1.Button>
      </div>);
    }
    api.addPanel({
        title: 'demo',
        path: '/demo',
        icon: 'home',
        component: PluginPanel,
    });
};
