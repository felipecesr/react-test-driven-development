import Header from 'components/Header/Header'

const Home = ({ history }) => (
  <Header title='My List' openForm={() => history.push('new')} />
)

export default Home
