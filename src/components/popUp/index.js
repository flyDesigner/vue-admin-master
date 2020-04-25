import Vue from 'vue'
import comPopup from './index.vue'

class PopUp {
    constructor(component = {}, option = {}, callback) {
        option.on = option.on || {}
        option.on['setTitle'] = (title) => {
            this.pageInstance.setTitle(title);
        }
        option.on['setPageActions'] = (data) => {
            this.pageInstance.setPageActions(data)
        }
        option.on['setPageSize'] = (data) => {
            this.pageInstance.setSize(data)
        }
        option.on['setFootShow'] = (data) => {
            this.pageInstance.setFootShow(data)
        }
        option.on['setPageTopSize'] = (data) => {
            this.pageInstance.setTopSize(data)
        }
        option.on['setActionsState'] = (data) => {
            this.pageInstance.setActionsState(data.btn, data.state);
        }
        option.on['close'] = (data) => {
            this.pageInstance.hide();
            // $instanceModalArray.pop();
            $channel.$off('RouterChangeBefore');
            !!callback && callback(data);
        }
        option.on['setButtonCenter'] = (data) => {
            this.pageInstance.setButtonCenter();
        }
        
        option.on['setHeightOfModal'] = (data) => {
            this.pageInstance.setHeightOfModal();
        }
        option.on['setModalMove'] = (data) => {
            this.pageInstance.setModalMove();
        }

        

        this.instance = new Vue({
            el: document.createElement('div'),
            render: function(createElement) {
                return createElement(
                    comPopup, [
                        createElement(
                            component,
                            option,
                            this.$slots.default
                        )
                    ]
                )
            }
        })
        this.pageInstance = this.instance.$children[0];
        document.body.appendChild(this.instance.$el);
        $channel.$once('RouterChangeBefore', () => {
            this.pageInstance.hide();
            $instanceModalArray.pop();
        })
        $instanceModalArray.push(this);
    }

}
window.$instanceModalArray = [];
export default PopUp;