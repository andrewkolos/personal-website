import { GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring'

/**
 * Extracts params from context passed to getStaticProps calls. Throws an error
 * if params is undefined for whatever reason.
 */
export function getParamsFromStaticPropsContext<Q extends ParsedUrlQuery = ParsedUrlQuery>(context: GetStaticPropsContext<Q>) {
  const result = context.params
  if (result == null) {
    throw Error(`No params found within static props context`)
  }
  return result
}
