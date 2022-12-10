import { FC } from 'react'
import { useParams } from 'react-router-dom';

const SingleQuote: FC<{}> = () => {
	const { quoteId } = useParams();

  return (
		<div className="">
			Single Quote {quoteId}
		</div>
  );
}

export default SingleQuote;