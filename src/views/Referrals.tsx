import React from 'react'
import styled from 'styled-components'
import { Button, Heading, Text, LogoIcon, Image} from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import useI18n from 'hooks/useI18n'
import { useWallet } from '@binance-chain/bsc-use-wallet'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`

const Referrals = () => {
  const TranslateString = useI18n()
  const { account } = useWallet()
  return (
    <Page>
      <StyledNotFound>
      <Text mb="16px">Earn 2% of your trip friends earnings! use this link to invite friends:
https://tripswap.finance?ref={account}</Text>
<Image src="/images/trip/10.jpg" alt="illustration" width={400} height={350} />

      </StyledNotFound>
    </Page>
  )
}

export default Referrals
