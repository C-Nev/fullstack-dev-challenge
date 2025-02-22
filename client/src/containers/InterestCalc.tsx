import React, { useEffect, useState } from 'react'

import { Container, Flex, Heading, VStack } from '@chakra-ui/react'
import fetch from 'node-fetch'

import Input from '../components/Input/Input'
import Slider from '../components/Slider/Slider'
import LineChart from '../components/LineChart/LineChart'
import DefaultLayout from '../components/layouts/Default'
import InfoCard from '../containers/InformationCard'

const CompoundInterestCalc = () => {
    const [data, setData] = useState<{ xAxis: number[]; yAxis: number[] }>({
        xAxis: [],
        yAxis: [],
    })
    const [formInput, setFormInput] = useState({
        initialSavings: 5000,
        monthlyDeposit: 100,
        interestRate: 0.1,
    })

    useEffect(() => {
        // fetch new data when formInput changes
        fetch('http://localhost:3001/', {
            method: 'post',
            body: JSON.stringify(formInput),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(async (res) => {
                let { data } = await res.json()
                setData({ xAxis: [...Array(data.length).keys()], yAxis: data })
            })
            .catch((e) => console.log(e))
    }, [formInput])

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Handle change of text input
        setFormInput({
            ...formInput,
            [event.target.name]: parseInt(event.target.value) || 0,
        })
    }
    return (
        <DefaultLayout>
            <Flex
                flexWrap="wrap"
                flexDir="row"
                justifyContent="space-around"
                alignItems="center"
                width="100%"
                maxW="1200px"
                marginX="auto"
                marginY="auto"
            >
                <Container w="100%" maxW="900px" mx="20px">
                    <LineChart
                        title="Savings Over time"
                        xAxisData={data.xAxis}
                        yAxisData={data.yAxis}
                        xLabel="Years"
                        yLabel="Amount"
                    />
                </Container>
                <VStack spacing={4} mx="30px" my="50px">
                    <Heading as="h1" paddingBottom="20px" color="#094067">
                        Compound Interest Calculator
                    </Heading>
                    <Input
                        label="Initial Savings amount"
                        name="initialSavings"
                        placeholder="5000"
                        value={formInput.initialSavings}
                        onChange={onChange}
                    />
                    <Input
                        label="Monthly Deposit"
                        name="monthlyDeposit"
                        placeholder="100"
                        value={formInput.monthlyDeposit}
                        onChange={onChange}
                    />
                    <Slider
                        value={formInput.interestRate * 100}
                        label={
                            'Monthly Interest Rate    ' + formInput.interestRate.toString() + '%'
                        }
                        name="interestRate"
                        defaultValue={5}
                        min={0}
                        max={100}
                        onChange={(value) => {
                            setFormInput({ ...formInput, interestRate: value / 100 })
                        }}
                    />
                </VStack>
                <InfoCard
                    isLoaded = {true}
                    total={data.yAxis[data.yAxis.length-1]}
                    returnTotal={data.yAxis[data.yAxis.length-1]-formInput.initialSavings}
                    returnOnInvestment={((data.yAxis[data.yAxis.length-1] - formInput.initialSavings) / formInput.initialSavings) * 100}
                ></InfoCard>
            </Flex>
        </DefaultLayout>
    )
}

export default CompoundInterestCalc
