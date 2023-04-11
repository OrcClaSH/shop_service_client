import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader
    className='product-block'
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="137" cy="130" r="130" />
    <rect x="0" y="270" rx="12" ry="12" width="280" height="30" />
    <rect x="0" y="314" rx="12" ry="12" width="280" height="88" />
    <rect x="3" y="465" rx="0" ry="0" width="54" height="24" />
    <rect x="0" y="426" rx="12" ry="12" width="114" height="27" />
    <rect x="125" y="416" rx="21" ry="21" width="152" height="45" />
  </ContentLoader>
)

export default Skeleton;
