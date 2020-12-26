export const getStatus = (meta, validating) => {
    if (meta.active && validating) {
      return 'validating';
    }
    if (!meta.touched) {
      return null;
    }
    return meta.error ? 'error' : 'success';
  };
  
  // 校验合并
  // eslint-disable-next-line max-len
  export const composeValidators = (...validators) => value => validators.reduce((error, validator) => error || validator(value), undefined);
  
  // 必填
  export const required = value => (!value || !value.trim() ? '不能为空' : undefined);
  
  // 必填
  export const requiredTxt = text => value => (!value || !value.trim() ? text : undefined);
  
  // 仅支持字母、数字、“_”及的组合, 且不能以数字和下划线开头
  export const validate2Datasourcename = value => (!(value && /^[a-zA-Z0-9_]+$/g.test(value))
    ? '仅支持汉字、字母、数字、"_"及"-"的组合'
    : undefined);
  
  export const limit20 = value => (value.length > 20
    ? '最长20字符'
    : undefined);
  
  export const limitFn = (value, limit) => (value.length > limit
    ? `最长${limit}字符`
    : undefined);
  
  // 仅支持汉字、字母、数字、“_”及“-”的组合
  export const ValidateDataName = value => (!(value && /^[\u4e00-\u9fa5a-zA-Z0-9_-]+$/g.test(value))
    ? '仅支持汉字、字母、数字、"_"及"-"的组合'
    : undefined);
  
  // 仅支持汉字、字母、数字、"_"的组合
  export const validateText = value => /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/g.test(value);
  // 仅支持汉字、字母、数字、"_"的组合
  export const validateCommitText = value => /^[\u4e00-\u9fa5a-zA-Z0-9_" "]+$/g.test(value);
  // 数据源名称 仅支持汉字、字母、数字、“_”及“-”的组合
  export const ValidateForFileName = value => (!(value && /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/g.test(value))
    ? '仅支持汉字，英文，数字和下划线'
    : undefined);
  
  // 存储桶校验 形如 xxx-1258469122
  export const ValidateCvmBucket = value => (!(value && /^[a-z0-9-]+-\d+$/g.test(value))
    ? '仅支持小写字母、数字和"-"的组合'
    : undefined);
  
  // 大于等于1的整数
  export const GtEqOneInt = value => (!(value && /^[1-9]\d*$/g.test(value)) ? '请输入大于等于1的整数' : undefined);
  
  // 大于等于2的整数
  export const GtEq2Int = value => (!(value && /^([2-9])|([1-9]\d+)$/g.test(value)) ? '请输入大于等于2的整数' : undefined);
  
  // 大于等于0的整数
  export const GtEqZeroInt = value => (!(value && /^\d*$/g.test(value)) ? '请输入大于等于0的整数' : undefined);
  
  // 大于等于0的数值，包含小数
  export const GtEqZero = value => (!(value && /^\d+(\.\d+)?$/g.test(value)) ? '请输入大于等于0的数值' : undefined);
  
  // 0到1之间的小数, (0,1)   缺陷只能匹配6位，0.0000001为false
  export const InZeroAndOne = value => (!(value && /^0(\.\d{1,6})+$/g.test(value)) ? '请输入0到1之间的小数' : undefined);
  
  // 大于0小于等于1的数值，包含小数 (0,1]
  export const GtZeroLtEqOne = value => (!(value && /^(0(\.\d{1,6})+|1)$/g.test(value)) ? '请输入大于0小于等于1的数值' : undefined);
  
  // 大于0小于等于2的数值，包含小数 (0,2]
  export const GtZeroLtEqTwo = value => (!(value && /^([0-1](\.\d{1,6})+|2|1)$/g.test(value)) ? '请输入大于0小于等于2的数值' : undefined);
  
  // 大于0小于1的数值，包含小数 (0,1]
  export const GtZeroLtOne = value => (!(value && /^(0(\.\d{1,6})+)$/g.test(value)) ? '请输入大于0小于1的数值' : undefined);
  
  // 0到1的数值，包含小数 [0,1]
  export const BetweenZeroAndOne = value => (!(value && /^(0(\.\d{1,6})?|1)$/g.test(value)) ? '请输入0到1的数值' : undefined);
  
  // 请输入正确的时间，yyyymm、yyyymmdd、yyyymmddhh 3种格式均可
  export const validateDateFormat = value => (!(value && /^(\d{6}|\d{8}|\d{10})$/g.test(value))
    ? '请输入正确的时间格式，仅允许yyyymm、yyyymmdd、yyyymmddhh3种格式'
    : undefined);
  