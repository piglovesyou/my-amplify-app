// import Link from 'next/link'
import { useGetPostQuery, GetPostDocument } from '../lib/getPost.graphql';
import { initializeApollo } from '../lib/apollo'

const Index = () => {
  const {data, loading} = useGetPostQuery({
    variables: {
      id: 'post-1'
    }
  });
  if (loading) return <div>loading</div>;
  const { getPost } = data!

  return (
    <div>
      {getPost?.title} from {getPost?.blog?.name}
    </div>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: GetPostDocument,
    variables: {
      id: 'post-1'
    }
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default Index
