"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ref:
// - https://umijs.org/plugins/api
 % ;
if (withUmiUI) {
    - %  >
    ;
    import { join } from 'path';
     % ;
}
- %  >
;
function default_1(api) {
    api.logger.info('use plugin');
    api.modifyHTML(($) => {
        $('body').prepend(`<h1>hello umi plugin</h1>`);
        return $;
    });
     % ;
    if (withUmiUI) {
        - %  >
            // @ts-ignore
            api.addUIPlugin(() => (0, path_1.join)(__dirname, '../dist/index.umd.js'));
        // @ts-ignore
        api.onUISocket(({ action, failure, success }) => {
            if (action.type === 'org.xiaohuoni.demo.test') {
                success({
                    data: 'demo.test',
                });
            }
        });
         % ;
    }
    - %  >
    ;
}
exports.default = default_1;
