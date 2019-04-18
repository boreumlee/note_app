import {ApolloClient} from 'apollo-client';
import { InMemoryCache} from 'apollo-cache-inmemory';
import {withClientState} from 'apollo-link-state';
import {ApolloLink} from 'apollo-link';
import { defaults, resolvers, typeDefs } from './clientState'

//make cache object
//수동방식임 apollo boost를 쓰면 알아서 다 만들어줌
const cache = new InMemoryCache();

//기본적으로 apollo의 거의 모든 명령어들은 전부 링크가 됨. 
//예를 들어 http로 link한다면 HTTPLink이고 에러를 link하면 ErrorLink고 그럼.
const stateLink = withClientState({
    //client state를 위한 설정을 필요로함
    //default state가 필요 ex. notes는 타입정의, resolvers ...
    //이부분에 앱에 필요한 모든 로직을 넣어야 한다는것
    //그러니까 clientState파일을 따로 만들어서 관리? 해

    //client state는 cache가 필요 내가 clientstate를 어디다가 저장할건지 지정하는거지
    cache,
    defaults,
    resolvers,
    typeDefs
});

const client = new ApolloClient({
    cache,
    link: ApolloLink.from([stateLink])
    //여기에 뭐 httplink or errorlink를 만드는것
    //또한 subscription을 위한 web socket을 넣거나
});

export default client;
