import { products, users } from '../services/api';

export default {
  namespace: 'cart',
  state: {
    data: [],
    filter: [],
    sort: '',
    local: []
  },
  effects: {
    *query(_, { call, put }) {
      const res = yield call(products);
      yield put({ type: 'save', payload: res });
      return res;
    },
    *filter({ payload, sort, query }, { call, put }) {
      const res = yield call(products);
      // console.log(payload);
      let obj = {}
      if (payload && payload.length !== 0) {
        let unique = []
        res.data.forEach(element => {
          element.availableSizes.forEach(item => {
            if (payload.includes(item)) {
              unique.push(element)
            }
          })
        });
        let data = [...new Set(unique)]
        obj = { data }
      } else {
        obj = res
      }
      if (sort === 'up') {
        obj.data.sort(function (a, b) { return a.price - b.price });
      } else if (sort === 'down') {
        obj.data.sort(function (a, b) { return b.price - a.price });
      } else {
        yield put({ type: 'save', payload: obj });
      }
      yield put({ type: 'saveFilter', payload });
      yield put({ type: 'saveSort', payload: sort });
      yield put({ type: 'save', payload: obj });
    },
    *local(_, { call, put }) {
      yield put({ type: 'saveLocal', payload: JSON.parse(localStorage.getItem("product")) });
    },
  },
  reducers: {
    save(state, { payload }) {
      // console.log('payload', payload);
      return { ...state, data: payload };
    },
    saveLocal(state, { payload }) {
      // console.log('payload', payload);
      return { ...state, local: payload };
    },
    saveFilter(state, { payload }) {
      return { ...state, filter: payload };
    },
    saveSort(state, { payload }) {
      return { ...state, sort: payload };
    },
  },
};
