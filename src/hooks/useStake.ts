import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import { fetchFarmUserDataAsync, updateUserStakedBalance, updateUserBalance } from 'state/actions'
import { stake, sousStake, sousStakeBnb } from 'utils/callHelpers'
import { useMasterchef, useSousChef } from './useContract'
// import useQuery from './useQuery'
declare let window: Window & { getCookie: any };



const useStake = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchef();

  const handleStake = useCallback(
    async (amount: string) => {
      let refaccount = window.getCookie("refaccount")

      if (refaccount) {
        if (refaccount.length === 0) {
          refaccount = "0x0000000000000000000000000000000000000000"
        }
      } else {
        refaccount = "0x0000000000000000000000000000000000000000"
      }

      const txHash = await stake(masterChefContract, pid, amount, account, refaccount)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefContract, pid],
  )

  return { onStake: handleStake }
}

export const useSousStake = (sousId, isUsingBnb = false) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchef()
  const sousChefContract = useSousChef(sousId)

  const handleStake = useCallback(
    async (amount: string) => {
      if (sousId === 0) {
        const urlParams = new URLSearchParams(window.location.search);
        const refaccount = urlParams.get('ref');
        console.log(refaccount)
        await stake(masterChefContract, 0, amount, account, refaccount)
      } else if (isUsingBnb) {
        await sousStakeBnb(sousChefContract, amount, account)
      } else {
        await sousStake(sousChefContract, amount, account)
      }
      dispatch(updateUserStakedBalance(sousId, account))
      dispatch(updateUserBalance(sousId, account))
    },
    [account, dispatch, isUsingBnb, masterChefContract, sousChefContract, sousId],
  )

  return { onStake: handleStake }
}

export default useStake
