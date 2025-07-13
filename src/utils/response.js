/**
 * description: 统一接口响应工具
 * create by 2025-07-02
 * author: shunyi
 */

/**
 * 成功响应
 * @param {any} data 返回数据
 * @param {string} msg 提示信息
 * @returns {object}
 */
export function success(data = null, msg = 'success') {
  return {
    code: 0,
    msg,
    data
  };
}

/**
 * 失败响应
 * @param {string} code 错误码
 * @param {string} msg 错误信息
 * @param {any} data 附加数据
 * @returns {object}
 */
export function fail(msg = 'fail', code = 1,  data = null) {
  return {
    code,
    msg,
    data
  };
} 