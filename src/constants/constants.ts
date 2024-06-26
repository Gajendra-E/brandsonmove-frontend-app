import AnimationImg1 from "../assets/animations/1.gif";
import AnimationImg2 from "../assets/animations/2.gif";
import AnimationImg3 from '../assets/animations/3.gif';
import AnimationImg4 from '../assets/animations/4.gif';
import AnimationImg5 from '../assets/animations/5.gif';
import AnimationImg6 from '../assets/animations/6.gif';
import AnimationImg7 from '../assets/animations/7.gif';
import AnimationImg8 from '../assets/animations/8.gif';
import defaultAnimationImage from "../assets/animations/defaultimage.gif";

import salesAnimation1 from "../assets/animations/sales_1.gif";
import salesAnimation2 from "../assets/animations/sales_2.gif";
import salesAnimation3 from '../assets/animations/sales_3.gif';
import salesAnimation4 from '../assets/animations/sales_4.gif';
import salesAnimation5 from '../assets/animations/sales_5.gif';
import salesAnimation6 from '../assets/animations/sales_6.gif';
import salesDefaultAnimation from "../assets/animations/salesdefaultimage.gif";

import growth from '../assets/images/Growth.svg';
import growthLeft from '../assets/images/Growth-left.svg';
import promotion from '../assets/images/Promotion.svg';
import promotionLeft from '../assets/images/Promotion-left.svg';
import customerExperience from '../assets/images/CusExperience.svg';
import customerExperienceLeft from '../assets/images/CusExperience-left.svg';
import ready from '../assets/images/Ready.svg';
import readyLeft from '../assets/images/Ready-left.svg';
import trend from '../assets/images/Trend.svg';
import trendLeft from '../assets/images/Trend-left.svg';
import growthIcon from '../assets/icons/growth.svg';
import promotionIcon from '../assets/icons/promotion.svg';
import customerIcon from '../assets/icons/customer-experience.svg';
import readyIcon from '../assets/icons/ready.svg';
import trendIcon from '../assets/icons/trend.svg';

import icon1 from '../assets/icons/1.png';
import icon2 from '../assets/icons/2.png';
import icon3 from '../assets/icons/3.png';
import icon4 from '../assets/icons/4.png';
import icon5 from '../assets/icons/5.png';

import AdImageOne from '../assets/images/header_business_strategy.jpg';
import AdImageTwo from '../assets/images/header_distribution.jpg';
import AdImageThree from '../assets/images/header_project_technology.jpg';
import AdImageFour from '../assets/images/header_trends_research.jpg';

export const MAX_IPAD_WIDTH = 819; 

export const CC_MAILS = [
    "rayapu00@rediffmail.com",
    "rayikaur@rediffmail.com",
];

export const TO_MAILS = [
    "rayapurv59@gmail.com"
];

export const ADVERTISMENT_IMAGES = [
    {
        id: 1,
        url: AdImageOne
    },
    {
        id: 2,
        url: AdImageTwo
    },
    {
        id: 3,
        url: AdImageThree
    },
    {
        id: 4,
        url: AdImageFour
    },
];


export const USECASESANDSTORIES = [
    {
        id: 1,
        word1: "Home &",
        word2: "LifeStyle",
        word3: "",
        icon: icon1,
        color: "#52C652",
    },
    {
        id: 2,
        word1: "Household &",
        word2: "Personal Care",
        word3: "",
        icon: icon2,
        color: "#E79757",
    },
    {
        id: 3,
        word1: "Health &",
        word2: "Wellness",
        word3: "",
        icon: icon3,
        color: "#4CBAC1",
    },
    {
        id: 4,
        word1: "Industrial &",
        word2: "Commercial",
        word3: "",
        icon: icon4,
        color: "#FF7367",
    },
    {
        id: 5,
        word1: "Retail & Large",
        word2: "Format Store",
        word3: "",
        icon: icon5,
        color: "#F06AFF",
    },
];

export const GROUPS = [
    {
        id: 1,
        word1: "GROWTH",
        word2: "",
        word3: "",
        imageurl1: growthLeft,
        imageurl2: growth,
        imageurl3: growthIcon,
        color: "#52C652",
        link: '/trueasuretrove/growth'
    },
    {
        id: 2,
        word1: "PROMOTION",
        word2: "",
        word3: "",
        imageurl1: promotionLeft,
        imageurl2: promotion,
        imageurl3: promotionIcon,
        color: "#E79757",
        link: '/trueasuretrove/promotion'
    },
    {
        id: 3,
        word1: "CUSTOMER",
        word2: "EXPERIENCE",
        word3: "",
        imageurl1: customerExperienceLeft,
        imageurl2: customerExperience,
        imageurl3: customerIcon,
        color: "#4CBAC1",
        link: '/trueasuretrove/customer_experience'
    },
    {
        id: 4,
        word1: "READY. BRAND.",
        word2: "LAUNCH",
        word3: "",
        imageurl1: readyLeft,
        imageurl2: ready,
        imageurl3: readyIcon,
        color: "#FF7367",
        link: '/trueasuretrove/ready_brand_launch'
    },
    {
        id: 5,
        word1: "TREND",
        word2: "FORECASTING",
        word3: "",
        imageurl1: trendLeft,
        imageurl2: trend,
        imageurl3: trendIcon,
        color: "#F06AFF",
        link: '/trueasuretrove/trend_forecast'
    },
];

export const CONSUMERBRANDANDINSIGHTS_DEFAULTCONTENT = {
    id: "100",
    name: "",
    description: "",
    title: "Consumer & Brand Insights",
    paragraph1: "Preparing to be friends with customers, align with their values, and to stand for an uplift which customers will celebrate, in many ways we support brands discovering and re-discovering their customers. Crowning with our in-depth insights, we make novel analytical revelations complete with vital interplays of fulfilling brand experience for customers. There is no better way to start the party.",
    paragraph2: "",
    textcolor: "#75BA75",
    bgcolor: "#E8FFE8",
    isSelected: false,
    animationurl: defaultAnimationImage,
    duration: 7,
}

export const CONSUMERBRANDANDINSIGHTS = [
    {
        id: 0,
        name: "Driver Attributes",
        description: "Brand Relevance, Distinction & Salience",
        title: "We discover causal relationship among a set of formative and reflective latent constructs to help identify strength of direct and indirect relationships of attributes driving brand relevance, distinction and salience among consumers.",
        paragraph1: "We craft category specific intelligent models to measure and quantify the relationships of brand attributes and mental availability. Making our partner brands easier to access in consumer memory, lifting their brand goals remarkably, opening new pathways to future.",
        paragraph2: "",
        textcolor: "#E0695E",
        bgcolor: "#FFEBEA",
        isSelected: false,
        animationurl: AnimationImg1,
        duration: 7,
    },
    {
        id: 1,
        name: "Growth levers",
        description: "Brand Power, Premium, Potential",
        title: "Discovering new age growth levers from emerging lifestyle motivations and changing sensorial trends drives uplifting association with brand, building new memories and refreshed power and pelf.",
        paragraph1: "We mine relevant crowd voice for mental availability of brands to evaluate their impacts on consumer behavior on buying. Galvanized by our insights on need states and context, brands can respond to real stress points and rise to evolving transformation of consumer buying habits.",
        paragraph2: "",
        textcolor: "#D78E52",
        bgcolor: "#FFF3EA",
        isSelected: false,
        animationurl: AnimationImg2,
        duration: 11,
    },
    {
        id: 2,
        name: "Product Positioning",
        description: "Feature Value for Customer",
        title: "The bouquets of product features or benefits are mapped with price elasticity to measure preference shares within multiple target segments.",
        paragraph1: "Fusing the preference shares for part elements we project market share estimates. Controlled locations tests are conducted in high volume user sites and at select customer touch points to fine tune the estimates. Strong communication story boards can be crafted with powerful triggers for switching buying habits.",
        paragraph2: "",
        textcolor: "#70AD70",
        bgcolor: "#EFFFEF",
        isSelected: false,
        animationurl: AnimationImg3,
        duration: 11,
    },
    {
        id: 3,
        name: "Customer Segmenting", 
        description: "Profiling for Shopping Channels",
        title: "Retail Banners and e-commerce channels can effectively dial up buyer footfall and cart conversion rates by promoting and positioning equity drivers.",
        paragraph1: "Segmenting shoppers based on their baskets, we establish cohort wise preferences for banner or channel attributes and analyze the impact of equity drivers on frequency of visit and basket value. Outlets can target high value cohorts with curated promotions and improve channel positioning for higher salience and share of wallet.",
        paragraph2: "",
        textcolor: "#6BAAAE",
        bgcolor: "#E4FDFF",
        isSelected: false,
        animationurl: AnimationImg4,
        duration: 11,
    },
    {
        id: 4,
        name: "Immersive Engagement",
        description: "Expert Advisory, Personalized Content",
        title: "Playing Jeeves, the valet by responding in a life moment with personalized content is our way for building brand loyalty.",
        paragraph1: "We build digital platforms for supporting personal preferences, responding to brand perception and capturing early trends in behavioral cohorts.",
        paragraph2: "Both informational social proof and normative influence are bed rocks of our consumer engagement approach. Intelligent algorithms we build are intrinsic to mechanisms for content delivery with matching cultural slants. Our consumer on-boarding platforms are most cost efficient tools for validating high value features.",
        textcolor: "#C964D3",
        bgcolor: "#FEF2FF",
        isSelected: false,
        animationurl: AnimationImg5,
        duration: 11,
    },
    {
        id: 5,
        name: "Price Optimization",
        description: "Brand Opportunity Sizing",
        title: "Durable brands depend more on consumer motivation to buy for real value than on any statistical indexing of market price.",
        paragraph1: "Our analytics with consumer segments can clear the fog of indices and price pointers and quickly uncover valuations of products by consumers in real buying scenario.",
        paragraph2: "Turn the world into moths to the flame. Competitive evaluation of need-state to product usefulness and comparative price benchmarking by us find the right keys for high growth in both bottom and top line. Our innovative choice based modelling reflects real world more closely than claimed preference based studies in pricing strategy.",
        textcolor: "#84BE24",
        bgcolor: "#E4FDFF",
        isSelected: false,
        animationurl: AnimationImg6,
        duration: 11,
    },
    {
        id: 6,
        name: "Pricing Strategy", 
        description: "Product Variants, Brand Portfolio",
        title: "Pricing of brand variants in a portfolio is often more complex than considering its cost, competition or goals for making profits.",
        paragraph1: "To crack the million dollar ask for the right price of a product, we test price points by analyzing comparative price elasticity of products and buying behaviour of target consumers.",
        paragraph2: "Tag a price to bring the house down. Price points in a brand portfolio are predicted by our analytics to enhance value perception of each item, delighting consumers every time they buy. Leveraging higher motivations of target consumers to buy preferred variants, the portfolio yields maximized sales with higher profit.",
        textcolor: "#47C6A0",
        bgcolor: "#E4FDFF",
        isSelected: false,
        animationurl: AnimationImg7,
        duration: 11,
    },
    {
        id: 7,
        name: "Marketing Mix", 
        description: "Brand Resonance in Customer Cohorts",
        title: "Consumer expectations around media and communication are changing with technologies they are growing up with.",
        paragraph1: "A market mix plan based on regressed historical data may overlook these rapid changes. In our dynamic mix models we take into account underlying shifts in consumer interaction with emerging options.",
        paragraph2: "Get a makeover of your plan, get on the same page with consumer. Our market mix plans are powered with inter-channel dynamics to deliver an integrated view of channel performance. Fast moving brands rely on our plans for generating brand resonance and reach in rising consumer segments.",
        textcolor: "#5F79DA",
        bgcolor: "#E4FDFF",
        isSelected: false,
        animationurl: AnimationImg8,
        duration: 11,
    },
];



export const SALESCONSUMPTIONANALYTICS_DEFAULTCONTENT = {
    id: "100",
    name: "",
    description: "",
    title: "Sales and Consumption Analytics",
    paragraph1: "Discovering genomes of upbeat customer segments as they evolve in real time is now made more precise than ever before.",
    paragraph2: "Our deep market analytics deliver immediate visibility far beyond current market landscape. And our action packed dashboards create the excitement by blending insights gleaned from consumer off-takes, ecosystem and competitive market dynamics. Brands who partner with us find no better way to reward customers than fulfilling their needs while aligning with their shopping habits.",
    textcolor: "#75BA75",
    bgcolor: "#E8FFE8",
    isSelected: false,
    animationurl: salesDefaultAnimation,
    duration: 7,
}

export const SALESCONSUMPTIONANALYTICS = [
    {
        id: "0",
        name: "HeatMaps",
        description: "Distribution & Growth Opportunities",
        title: "A product distribution plan built on past sales or historical demand can be quickly out of alignment with fast developing consumption trends, product innovation and demographic shifts across markets.",
        paragraph1: "Discovering where and how consumers are buying from competitive brands helps a brand focusing on markets and consumer cohorts, looking at loss of share on one hand and growth opportunities on the other.",
        paragraph2: "Turn up the heat on competition. We explore POS data using powerful data mining processes to turn up real factors shaping the consumption dynamics in different markets. Fuelled by these precise markers, brands quickly meet local market demands by priority and with high returns from activation plan.",
        textcolor: "#E0695E",
        bgcolor: "#FFEBEA",
        isSelected: true,
        animationurl: salesAnimation1,
        duration: 7,
    },
    {
        id: "1",
        name: "Forging Brand Potential",
        description: "Maximised Value per Share Point",
        title: "A brand having leading market share enjoys bandwagon effect in distribution and merchandizing plan.",
        paragraph1: "Retaining leadership in market is however, always challenged by rapid change in competitive scenarios in different markets, causing disruptions without any alert.",
        paragraph2: "Get a facelift to your sales and distribution network. Distribution efficiency in sales helps in capturing markets and rapid turn overs. We make pathways to leverage portfolio velocity for making high sale density in select markets and bring down distribution costs.",
        textcolor: "#D78E52",
        bgcolor: "#FFF3EA",
        isSelected: false,
        animationurl: salesAnimation2,
        duration: 11,
    },
    {
        id: "2",
        name: "Category Management",
        description: "Dynamics for Share Growth",
        title: "Our category analytics are designed to ingest transaction databases at different layers of distribution chain, down to POS scanners at outlets.",
        paragraph1: "Transforming invoiced transactions to distinct market characteristics at aggregated levels across market and drilling rapidly back into any targeted discrete level is our hallmark.",
        paragraph2: "Turn your brand into a show stopper. Brands across categories can use our lenses on transaction data to draw out markets and outlets where high visibility makes magical impact on sales. We make seamless optimization of shelf assortment and shelf space analysis for high value returns at retailers where it really matters.",
        textcolor: "#70AD70",
        bgcolor: "#EFFFEF",
        isSelected: false,
        animationurl: salesAnimation3,
        duration: 11,
    },
    {
        id: "3",
        name: "Customer Baskets", 
        description: "Cohorts for Shopping Channels",
        title: "Consumers and households are often classified by pre-defined criteria.",
        paragraph1: "Marking such groups however, drops the visibility of emerging opportunities in an evolving market. Instead, we turn up trending cohorts by diving into the composition of consumer baskets in terms of repertoire of brands and categories.",
        paragraph2: "Get up close to spread the smile. We explore consumer basket data using powerful machine learning techniques to uncover real factors and big buyers in the consumption matrix across markets. Powered by precise markers on consumer spends and their likes, brands quickly meet trending demands and leverage associative buying patterns and events.",
        textcolor: "#6BAAAE",
        bgcolor: "#E4FDFF",
        isSelected: false,
        animationurl: salesAnimation4,
        duration: 11,
    },
    {
        id: "4",
        name: "Hyper Local Trends", 
        description: "Decoding Competitive Shifts in Buying",
        title: "Purchase intentions gathered by consumer research and real buying are not same.",
        paragraph1: "We decode competitive shifts in consumption trends from aggregated basket compositions of dynamically classified consumer cohorts. Diving deep into changing preferences, we mark out emerging opportunities for strong brands to climb up the charts.",
        paragraph2: "Climb the waves, skip over the swirls. We explore the brand switching by consumers, with priority on impactful competitive interactions within targeted product segments. Powered by clarity in precise and real shift in sales within competition, leading brands can rapidly maximize market share by riding on the tide or holding out by counter activation.",
        textcolor: "#84BE24",
        bgcolor: "#E4FDFF",
        isSelected: false,
        animationurl: salesAnimation5,
        duration: 11,
    },
    {
        id: "5",
        name: "Gaining Share of Wallet", 
        description: "Upselling & Cross Selling to Cohorts",
        title: "Selling more to an existing  is cheaper and faster than finding more customers.",
        paragraph1: "We turn up the unfolding opportunities for up selling and cross selling to customers buying products of a brand.",
        paragraph2: "Pull your brand equity, get a bigger pie at check out. Unmasking the invisible association of products and brands across categories in consumer baskets, we find pathways for transcending brand equity. Use our trailblazer analytics to multiply shares in consumer wallet, make brand equity stronger and optimize costs of brand building.",
        textcolor: "#47C6A0",
        bgcolor: "#E4FDFF",
        isSelected: false,
        animationurl: salesAnimation6,
        duration: 11,
    }
];

