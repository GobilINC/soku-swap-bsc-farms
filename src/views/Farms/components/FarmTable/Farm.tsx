import React from 'react'
import styled from 'styled-components'
import { useFarmUser } from 'state/hooks'
import { useTranslation } from 'contexts/Localization'
import { Text, Image } from '@pancakeswap/uikit'
import { getBalanceNumber } from 'utils/formatBalance'

export interface FarmProps {
  label: string
  pid: number
  image: string
}

const IconImage = styled(Image)`
  width: 24px;
  height: 24px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 40px;
    height: 40px;
  }
`

const Container = styled.div`
  padding-left: 16px;
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 32px;
  }

  @media (max-width: 600px) {
    flex-direction: column-reverse;
  }
`

const Farm: React.FunctionComponent<FarmProps> = ({ image, label, pid }) => {
  const { stakedBalance } = useFarmUser(pid)
  const { t } = useTranslation()
  const rawStakedBalance = getBalanceNumber(stakedBalance)

  const handleRenderFarming = (): JSX.Element => {
    if (rawStakedBalance) {
      return (
        <Text color="#04bbfb" fontSize="12px" bold textTransform="uppercase">
          {t('Farming')}
        </Text>
      )
    }

    return null
  }

  return (
    <Container>
      <IconImage src={`/images/farms/${image}.png`} alt="icon" width={40} height={40} mr="8px" />

      {/* /images/farms/${image}.svg */}
      <div>
        {handleRenderFarming()}
        <Text bold style={{ textTransform: 'uppercase' }}>
          {image === 'soku-taste' ? 'soku-taste (DO NOT STAKE. YOU WILL LOSE YOUR TOKENS!)' : image}
          {/* {image} */}
        </Text>
      </div>
    </Container>
  )
}

export default Farm
