import {UserRoles} from "@/constants";
import {Icons} from "@/components/shared/icons";
import Stripe from "stripe";

export type NavItem = {
    title: string;
    href: string;
    badge?: number;
    disabled?: boolean;
    external?: boolean;
    authorizeOnly?: UserRoles;
    icon?: keyof typeof Icons;
};

export type SidebarNavItem = {
    title: string;
    items: NavItem[];
    authorizeOnly?: UserRoles;
    icon?: keyof typeof Icons;
};

export type StripeSubscription = {
    stripeSubscriptionId: string,
    stripeCustomerId: string,
    stripePriceId: string,
    subscriptionStatus: Stripe.Subscription.Status,
}

export type Organization = {
    id: string;
    name: string;
    stripe_subscription: StripeSubscription
};
