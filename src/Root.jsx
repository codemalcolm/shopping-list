import { Outlet } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import Layout from './Layout'

const Root = () => {
  return (
    <Box>
        <Layout>
            <Outlet />
        </Layout>
    </Box>
  )
}

export default Root