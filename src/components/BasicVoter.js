import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

/*
 * Create component.
 */

class BasicVoter extends Component {
    constructor(props, context) {
        super(props)

        this.contracts = context.drizzle.contracts

        this.stackId = this.contracts.BasicVoter.methods.countProposals.cacheSend({from: this.props.accounts[0]})

        console.log(this.stackId)
    }

    render() {

        if (this.props.store.getState().transactionStack[this.stackId]) {
            const txHash = this.props.store.getState().transactionStack[this.stackId]
    
            console.log(this.props.store.getState())
        }

        console.log()

        // if (!(this.dataKey in this.props.contracts.BasicVoter['countProposals'])) {
        //     return (
        //         <span>Fetching...</span>
        //     )
        // }
        // var displayData = this.props.contracts.BasicVoter['countProposals'][this.dataKey].value


        // return (
        //     <span>{displayData}</span>
        // )
        return (
            <span>1</span>
        )
    }
}

BasicVoter.contextTypes = {
    drizzle: PropTypes.object
}

/*
 * Export connected component.
 */

const mapStateToProps = state => {
    return {
        contracts: state.contracts
    }
}

export default drizzleConnect(BasicVoter, mapStateToProps)