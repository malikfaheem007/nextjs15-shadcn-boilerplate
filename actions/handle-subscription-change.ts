import Stripe from "stripe";
import {stripe} from "@/lib/stripe";
import {StripeSubscription} from "@/types/common";
import {updateOrganization} from "@/actions/organizations";

export async function handleSubscriptionChange(
    subscription: Stripe.Subscription
) {
    const organizationId = subscription.metadata.organizationId as string;

    const subscriptionData: StripeSubscription = {
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        subscriptionStatus: subscription.status,
    };

    await updateOrganization(organizationId, {stripe_subscription: subscriptionData});
}

export async function getStripePrices() {
    const prices = await stripe.prices.list({
        expand: ['data.product'],
        active: true,
        type: 'recurring'
    });

    return prices.data.map((price) => ({
        id: price.id,
        productId:
            typeof price.product === 'string' ? price.product : price.product.id,
        unitAmount: price.unit_amount,
        currency: price.currency,
        interval: price.recurring?.interval,
        trialPeriodDays: price.recurring?.trial_period_days
    }));
}

export async function getStripeProducts() {
    const products = await stripe.products.list({
        active: true,
        expand: ['data.default_price']
    });

    return products.data.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        defaultPriceId:
            typeof product.default_price === 'string'
                ? product.default_price
                : product.default_price?.id
    }));
}
