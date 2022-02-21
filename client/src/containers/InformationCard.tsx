import React from 'react'
import { Stack } from '@chakra-ui/react'
import ResultCard from '../components/Results/ResultCard'

type Props = {
    isLoaded: boolean
    total: number
    returnTotal: number
    returnOnInvestment: number
}

const InfoCard = ({ isLoaded, total, returnTotal, returnOnInvestment }: Props) => (
    <Stack direction={'column'} spacing={6} borderWidth="1px" borderRadius="lg" p={8}>
        <ResultCard
            isLoaded={isLoaded}
            statName="Expected Savings"
            statValue={`£`+total}
        />
        <ResultCard
            isLoaded={isLoaded}
            statName="Expected Return"
            statValue={`£`+returnTotal}
        />
        <ResultCard
            isLoaded={isLoaded}
            statName="Expected ROI"
            statValue={`${returnOnInvestment.toLocaleString('en')}%`}
        />
    </Stack>
)

export default InfoCard