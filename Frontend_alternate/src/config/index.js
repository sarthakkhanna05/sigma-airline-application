import { merge } from 'lodash';

const localConfig = {
  baseDomain: 'http://localhost:5000'
}

const prodConfig = {
  baseDomain: 'http://localhost:5000'
}

const baseConfig = {
    "class":[
        {
            "label": "Economy",
            "value": "economy"
        },
        {
            "label": "Business",
            "value": "business"
        },
        {
            "label": "First",
            "value": "first"
        }
    ],
    "flights": {
        "from": [
            {
                "label": "FROM",
                "value": "null"
            },
            {
                "label": "GOA",
                "value": "GOA"
            },
            {
                "label": "BAN",
                "value": "BAN"
            },
            {
                "label": "SEA",
                "value": "SEA"
            },
            {
                "label": "SJC",
                "value": "SJC"
            },
            {
                "label": "NYC",
                "value": "NYC"
            }
        ],
        "to": [
            {
                "label": "TO",
                "value": "null"
            },
            {
                "label": "GOA",
                "value": "GOA"
            },
            {
                "label": "BAN",
                "value": "BAN"
            },
            {
                "label": "SEA",
                "value": "SEA"
            },
            {
                "label": "SJC",
                "value": "SJC"
            },
            {
                "label": "NYC",
                "value": "NYC"
            }
        ]
    },
    "routes": [
        {
            "from": "SEA",
            "to": "NYC"
        },
        {
            "from": "SJU",
            "to": "NYC"
        },
        {
            "from": "SFO",
            "to": "NYC"
        }
    ],
    "paymentType": [
        {
            "label": "Card",
            "value": "card"
        },
        {
            "label": "Miles",
            "value": "miles"
        },
    ],
    "defaultPaymentType": "card"
}


const envConfig = process.env.NODE_ENV === 'production' ? prodConfig : localConfig;

export default merge({}, baseConfig, envConfig);