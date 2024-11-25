import blobTop from '../assets/Vector-2.svg'
import blobBottom from '../assets/Vector.svg'

export function BlobsDecoration() {
  return (
    <>
      <img
        src={blobTop}
        alt="Just a decorative blob at the top right"
        className="fixed top-0 right-0"
      />
      <img
        src={blobBottom}
        alt="Just a decorative blob at the bottom left"
        className="fixed bottom-0 left-0"
      />
    </>
  )
}
