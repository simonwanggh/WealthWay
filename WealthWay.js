import React from 'react';

// 3rd party libraries
import {
  Actions,
  Router,
  Scene,
  // Reducer,
} from 'react-native-router-flux';

// Views
import ProductView from './app/views/AIproducts'
import QuotationView from './app/views/exquotations';
import AddView from './app/views/add';
import MyView from './app/views/my';
import ProfitDetailsView from './app/views/profitdetails'


// @todo remove when RN upstream is fixed
console.ignoredYellowBox = [
  'Warning: In next release empty section headers will be rendered.',
  'Warning: setState(...): Can only update a mounted or mounting component.',
];

const scenes = Actions.create(
  <Scene key="root" hideNavBar={true}>
    <Scene key="main" title="主页" component={ProductView} initial={true} />
    <Scene key="profit" title="收益" component={ProfitDetailsView}/>
    <Scene key="quotation" title="汇率" component={QuotationView} />
    <Scene key="add" direction="vertical" title="添加" component={AddView} />
    <Scene key="my" direction="vertical" title='我的' component={MyView} />
  </Scene>
);

export default class Periods extends React.Component {
  render() {
    return <Router scenes={scenes} />;
  }
}
