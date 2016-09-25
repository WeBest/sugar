import { formatValue, isBool, isArray, warn } from '../../../util';

export default {
	/**
	 * 绑定 checkbox 变化事件
	 */
	bind: function () {
		var number = this.number;
		var directive = this.directive;

		this.on('change', function () {
			var value = directive.get();
			var checked = this.checked;

			if (isBool(value)) {
				directive.set(checked);
			} else if (isArray(value)) {
				let val = formatValue(this.value, number);
				let index = value.indexOf(val);

				// 勾选选项
				if (checked) {
					if (index === -1) {
						value.push(val);
					}
				} else {
					if (index > -1) {
						value.splice(index, 1);
					}
				}
			}
		});
	},

	/**
	 * 更新 checkbox 值
	 * @param   {Boolean|Array}  values
	 */
	update: function (values) {
		var el = this.el;
		var value = formatValue(el.value, this.number);

		if (!isArray(values) && !isBool(values)) {
			return warn('Checkbox v-model value must be a type of Boolean or Array');
		}

		el.checked = isBool(values) ? values : (values.indexOf(value) > -1);
	}
}