module.exports = {
  'env': {
    'es6': true,
    'node': true,
  },
  'extends': [
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 11,
    'sourceType': 'module',
  },
  'rules': {
    'max-len': ['error', {'code': 110}],
  },
};
