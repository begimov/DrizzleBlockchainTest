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

        this.web3Utils = context.drizzle.web3.utils

        this.dataKey = this.contracts.BasicVoter.methods.countProposals.cacheCall()
    }

    render() {
        if (!(this.dataKey in this.props.contracts.BasicVoter.countProposals)) {
            return (
                <span>Fetching...</span>
            )
        }

        var displayData = this.props.contracts.BasicVoter.countProposals[this.dataKey].value

        return (
            <span>
                <span>{displayData}</span>
                <span><button onClick={() => this.vote()}>VOTE</button></span>
            </span>
        )
    }

    vote() {
        console.log('VOTE')
        this.stackId = this.contracts.BasicVoter.methods.addProposal.cacheSend(this.web3Utils.asciiToHex('Proposal 1'), { from: this.props.accounts[0] })
        console.log(this.stackId)
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