#!/bin/bash
cd "$(dirname "$0")"
npm run start
cd ~/../n18dcat069-cart-service
run start
cd ~/../n18dcat069-notice-service
run start
cd ~/../n18dcat069-order-service
run start
cd ~/../n18dcat069-product-service
run start
cd ~/../n18dcat069-user-service
run start