"use client";
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { styles } from '@/global/styles';
import appLogo from "../../../public/eagle-face.svg"
import Image from 'next/image';
import { Divider, FormControl, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Select, SelectChangeEvent, SwipeableDrawer, Tab, Tabs } from '@mui/material';
import { useRouter } from 'next/navigation'
import PublicIcon from '@mui/icons-material/Public';
import CloseIcon from '@mui/icons-material/Close';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { setCookie, getCookie } from "cookies-next";
import countriesJson from "../../../countries.json"
import { config } from '@/global/config';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import CustomGoogleLogin from './AutoLogin';
import { Facebook, WhatsApp, Twitter, Instagram } from '@mui/icons-material';

const countries: any = countriesJson


// Note: ARIA does not enable accessible functionality.
//  ARIA only conveys the intended behavior of your functionality.



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));



const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function PrimarySearchAppBar() {

    // document.addEventListener("scroll", (e) => {
    //     const totalScroll = document.body.scrollHeight
    //     const currentScroll = window.scrollY
    //     const scrollPosition = (currentScroll / totalScroll) * 100
    //     console.log(scrollPosition > 70);
    //     console.log();


    // })

    const router = useRouter()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [value, setValue] = React.useState(0);
    const [search, setSearch] = React.useState("")
    const [anchor, setAnchor] = React.useState(false);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);






    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const handleKeyDownSearch = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key == "Enter") {
            router.push(`/?search=${search}`, { scroll: false })
            setSearch(value => "")


        }
    }

    const handleSearchChange = (event: any) => {
        setSearch(value => event.target.value)

    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        router.push(`/${newValue}`, { scroll: false })
        setAnchor(value => false)

    };

    let theCountry = getCookie('country')
    try {

        theCountry = JSON.parse(theCountry as string)
    } catch (error) {

    }

    const [country, setCountry] = React.useState<any>(theCountry);
    React.useEffect(() => {
        async function setCountryData() {
            console.log("______________setcountry");

            const response: any = await (await fetch(config.hostname, {
                method: "POST",
                cache: 'no-cache',
                headers: { 'Content-Type': 'application/json' },
            })).json()

            const countryReq = response.country?.toLowerCase() ?? "us"
            console.log(theCountry);

            if (!theCountry) {
                setCountry({ code: countryReq, name: "" })
                setCookie("country", { code: countryReq, name: "" })
            }
        }
        setCountryData()
    }, [])

    const [openLang, setOpenLang] = React.useState(false);

    const [layout, setLayout] = React.useState<string | number>('');
    const [openLayout, setOpenLayout] = React.useState(false);
    const handleChangeLang = (event: any) => {
        let currentCountry: any = event.target.value;
        let countryObj = { code: currentCountry, name: countries[currentCountry] }
        setCountry(countryObj);
        setCookie("country", countryObj);
        router.refresh()
    };

    const handleCloseLang = () => {
        setOpenLang(false);
    };

    const handleOpenLang = () => {
        setOpenLang(true);
    };

    const handleChangeLayout = (event: SelectChangeEvent<typeof layout>) => {
        setLayout(event.target.value);
    };

    const handleCloseLayout = () => {
        setOpenLayout(false);
    };

    const handleOpenLayout = () => {
        setOpenLayout(true);
    };

    const tabs = (orientation: ("vertical" | 'horizontal') = 'horizontal') => (
        <Tabs
            value={value}
            onChange={handleChange}
            orientation={orientation}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            TabIndicatorProps={{ style: styles.tabIndicatorProps }}
            TabScrollButtonProps={{ style: { color: "white" } }}
            textColor='inherit'

        >
            <Tab sx={styles.tab} label="Discover" value="" />
            <Tab sx={styles.tab} label="News" value="nation" />
            <Tab sx={styles.tab} label="World" value="world" />
            <Tab sx={styles.tab} label="Sports" value="sports" />
            <Tab sx={styles.tab} label="Business" value="business" />
            <Tab sx={styles.tab} label="Technology" value="technology" />
            <Tab sx={styles.tab} label="Entertainment" value="entertainment" />
            <Tab sx={styles.tab} label="Science" value="science" />
            <Tab sx={styles.tab} label="Health" value="health" />
            <Tab sx={styles.tab} label="General" value="general" />
        </Tabs>

    )

    const list = () => (
        <Box
            sx={{ width: 250 }}
        >
            {tabs("vertical")}
        </Box>
    );

    const profileBar = () => (
        <>
            <Search sx={styles.search}>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={search}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDownSearch}
                />
            </Search>
            <Box sx={{ display: 'flex', ml: 'auto' }}>
                <SocialMediaIcons />
            </Box>

        </>


    )

    const SocialMediaIcons = () => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
                size="large"
                aria-label="Follow Us on Facebook"
                color="inherit"
                href="https://www.facebook.com"
                target="_blank"
            >
                <Facebook />
            </IconButton>
            <IconButton
                size="large"
                aria-label="Follow Us on WhatsApp"
                color="inherit"
                href="https://wa.me"
                target="_blank"
            >
                <WhatsApp />
            </IconButton>
            {/* <IconButton
                size="large"
                aria-label="Follow Us on Twitter"
                color="inherit"
                href="https://twitter.com"
                target="_blank"
            >
                <Twitter />
            </IconButton>
            <IconButton
                size="large"
                aria-label="Follow Us on Instagram"
                color="inherit"
                href="https://www.instagram.com"
                target="_blank"
            >
                <Instagram />
            </IconButton> */}
        </Box>
    );


    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            slotProps={{ paper: { sx: styles.menu } }}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
        >

            <IconButton
                aria-label="close"
                onClick={handleMenuClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <br />
            <br />

            <Typography variant='h5' >Language and region</Typography>
            <FormControl sx={styles.menuFormControl}>
                {/* <InputLabel id="demo-controlled-open-select-label">Lang</InputLabel> */}
                <Select
                    // labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={openLang}
                    onClose={handleCloseLang}
                    onOpen={handleOpenLang}
                    value={country?.code}
                    label="lang"
                    onChange={handleChangeLang}
                    defaultValue={country?.code}
                    displayEmpty

                >

                    <MenuItem value={"af"}>Afghanistan</MenuItem>
                    <MenuItem value={"al"}>Albania</MenuItem>
                    <MenuItem value={"dz"}>Algeria</MenuItem>
                    <MenuItem value={"as"}>American Samoa</MenuItem>
                    <MenuItem value={"ai"}>Anguilla</MenuItem>
                    <MenuItem value={"au"}>Australia</MenuItem>
                    <MenuItem value={"at"}>Austria</MenuItem>
                    <MenuItem value={"bs"}>Bahamas</MenuItem>
                    <MenuItem value={"bh"}>Bahrain</MenuItem>
                    <MenuItem value={"bd"}>Bangladesh</MenuItem>
                    <MenuItem value={"bb"}>Barbados</MenuItem>
                    <MenuItem value={"by"}>Belarus</MenuItem>
                    <MenuItem value={"be"}>Belgium</MenuItem>
                    <MenuItem value={"bz"}>Belize</MenuItem>
                    <MenuItem value={"bj"}>Benin</MenuItem>
                    <MenuItem value={"bm"}>Bermuda</MenuItem>
                    <MenuItem value={"bt"}>Bhutan</MenuItem>
                    <MenuItem value={"ba"}>Bosnia And Herzegovina</MenuItem>
                    <MenuItem value={"bv"}>Bouvet Island</MenuItem>
                    <MenuItem value={"br"}>Brazil</MenuItem>
                    <MenuItem value={"io"}>British Indian Ocean Territory</MenuItem>
                    <MenuItem value={"bn"}>Brunei Darussalam</MenuItem>
                    <MenuItem value={"bg"}>Bulgaria</MenuItem>
                    <MenuItem value={"bf"}>Burkina Faso</MenuItem>
                    <MenuItem value={"bi"}>Burundi</MenuItem>
                    <MenuItem value={"kh"}>Cambodia</MenuItem>
                    <MenuItem value={"cm"}>Cameroon</MenuItem>
                    <MenuItem value={"ca"}>Canada</MenuItem>
                    <MenuItem value={"cv"}>Cape Verde</MenuItem>
                    <MenuItem value={"cf"}>Central African Republic</MenuItem>
                    <MenuItem value={"cl"}>Chile</MenuItem>
                    <MenuItem value={"cn"}>China</MenuItem>
                    <MenuItem value={"co"}>Colombia</MenuItem>
                    <MenuItem value={"km"}>Comoros</MenuItem>
                    <MenuItem value={"cd"}>Congo, Democratic Republic Of The</MenuItem>
                    <MenuItem value={"cg"}>Congo, Republic Of The</MenuItem>
                    <MenuItem value={"cr"}>Costa Rica</MenuItem>
                    <MenuItem value={"ci"}>Cote D &apos ivoire</MenuItem>
                    <MenuItem value={"hr"}>Croatia</MenuItem>
                    <MenuItem value={"cu"}>Cuba</MenuItem>
                    <MenuItem value={"cy"}>Cyprus</MenuItem>
                    <MenuItem value={"cz"}>Czech Republic</MenuItem>
                    <MenuItem value={"dk"}>Denmark</MenuItem>
                    <MenuItem value={"dj"}>Djibouti</MenuItem>
                    <MenuItem value={"do"}>Dominican Republic</MenuItem>
                    <MenuItem value={"ec"}>Ecuador</MenuItem>
                    <MenuItem value={"eg"}>Egypt</MenuItem>
                    <MenuItem value={"sv"}>El Salvador</MenuItem>
                    <MenuItem value={"er"}>Eritrea</MenuItem>
                    <MenuItem value={"et"}>Ethiopia</MenuItem>
                    <MenuItem value={"eu"}>Europe</MenuItem>
                    <MenuItem value={"fj"}>Fiji</MenuItem>
                    <MenuItem value={"fi"}>Finland</MenuItem>
                    <MenuItem value={"fr"}>France</MenuItem>
                    <MenuItem value={"gf"}>French Guiana</MenuItem>
                    <MenuItem value={"pf"}>French Polynesia</MenuItem>
                    <MenuItem value={"gm"}>Gambia</MenuItem>
                    <MenuItem value={"de"}>Germany</MenuItem>
                    <MenuItem value={"gh"}>Ghana</MenuItem>
                    <MenuItem value={"gr"}>Greece</MenuItem>
                    <MenuItem value={"gt"}>Guatemala</MenuItem>
                    <MenuItem value={"gn"}>Guinea</MenuItem>
                    <MenuItem value={"gy"}>Guyana</MenuItem>
                    <MenuItem value={"hn"}>Honduras</MenuItem>
                    <MenuItem value={"hk"}>Hong Kong</MenuItem>
                    <MenuItem value={"hu"}>Hungary</MenuItem>
                    <MenuItem value={"is"}>Iceland</MenuItem>
                    <MenuItem value={"in"}>India</MenuItem>
                    <MenuItem value={"id"}>Indonesia</MenuItem>
                    <MenuItem value={"ir"}>Iran</MenuItem>
                    <MenuItem value={"iq"}>Iraq</MenuItem>
                    <MenuItem value={"ie"}>Ireland</MenuItem>
                    <MenuItem value={"il"}>Israel</MenuItem>
                    <MenuItem value={"it"}>Italy</MenuItem>
                    <MenuItem value={"jp"}>Japan</MenuItem>
                    <MenuItem value={"jo"}>Jordan</MenuItem>
                    <MenuItem value={"kz"}>Kazakhstan</MenuItem>
                    <MenuItem value={"ke"}>Kenya</MenuItem>
                    <MenuItem value={"kw"}>Kuwait</MenuItem>
                    <MenuItem value={"la"}>Laos</MenuItem>
                    <MenuItem value={"lv"}>Latvia</MenuItem>
                    <MenuItem value={"lb"}>Lebanon</MenuItem>
                    <MenuItem value={"ls"}>Lesotho</MenuItem>
                    <MenuItem value={"lr"}>Liberia</MenuItem>
                    <MenuItem value={"li"}>Liechtenstein</MenuItem>
                    <MenuItem value={"lt"}>Lithuania</MenuItem>
                    <MenuItem value={"lu"}>Luxembourg</MenuItem>
                    <MenuItem value={"mk"}>Macedonia</MenuItem>
                    <MenuItem value={"mg"}>Madagascar</MenuItem>
                    <MenuItem value={"mw"}>Malawi</MenuItem>
                    <MenuItem value={"my"}>Malaysia</MenuItem>
                    <MenuItem value={"mv"}>Maldives</MenuItem>
                    <MenuItem value={"ml"}>Mali</MenuItem>
                    <MenuItem value={"mt"}>Malta</MenuItem>
                    <MenuItem value={"mr"}>Mauritania</MenuItem>
                    <MenuItem value={"mu"}>Mauritius</MenuItem>
                    <MenuItem value={"mx"}>Mexico</MenuItem>
                    <MenuItem value={"fm"}>Micronesia, Federated States Of</MenuItem>
                    <MenuItem value={"md"}>Moldova</MenuItem>
                    <MenuItem value={"mc"}>Monaco</MenuItem>
                    <MenuItem value={"me"}>Montenegro</MenuItem>
                    <MenuItem value={"ms"}>Montserrat</MenuItem>
                    <MenuItem value={"ma"}>Morocco</MenuItem>
                    <MenuItem value={"mm"}>Myanmar</MenuItem>
                    <MenuItem value={"na"}>Namibia</MenuItem>
                    <MenuItem value={"np"}>Nepal</MenuItem>
                    <MenuItem value={"nl"}>Netherlands</MenuItem>
                    <MenuItem value={"nz"}>New Zealand</MenuItem>
                    <MenuItem value={"ne"}>Niger</MenuItem>
                    <MenuItem value={"ng"}>Nigeria</MenuItem>
                    <MenuItem value={"kp"}>North Korea</MenuItem>
                    <MenuItem value={"no"}>Norway</MenuItem>
                    <MenuItem value={"om"}>Oman</MenuItem>
                    <MenuItem value={"pk"}>Pakistan</MenuItem>
                    <MenuItem value={"ps"}>Palestinian Territory</MenuItem>
                    <MenuItem value={"py"}>Paraguay</MenuItem>
                    <MenuItem value={"pe"}>Peru</MenuItem>
                    <MenuItem value={"ph"}>Philippines</MenuItem>
                    <MenuItem value={"pl"}>Poland</MenuItem>
                    <MenuItem value={"pt"}>Portugal</MenuItem>
                    <MenuItem value={"qa"}>Qatar</MenuItem>
                    <MenuItem value={"ro"}>Romania</MenuItem>
                    <MenuItem value={"ru"}>Russia</MenuItem>
                    <MenuItem value={"rw"}>Rwanda</MenuItem>
                    <MenuItem value={"kn"}>Saint Kitts And Nevis</MenuItem>
                    <MenuItem value={"vc"}>Saint Vincent And The Grenadines</MenuItem>
                    <MenuItem value={"sm"}>San Marino</MenuItem>
                    <MenuItem value={"sa"}>Saudi Arabia</MenuItem>
                    <MenuItem value={"sn"}>Senegal</MenuItem>
                    <MenuItem value={"rs"}>Serbia</MenuItem>
                    <MenuItem value={"sc"}>Seychelles</MenuItem>
                    <MenuItem value={"sl"}>Sierra Leone</MenuItem>
                    <MenuItem value={"sg"}>Singapore</MenuItem>
                    <MenuItem value={"sk"}>Slovakia</MenuItem>
                    <MenuItem value={"si"}>Slovenia</MenuItem>
                    <MenuItem value={"sb"}>Solomon Islands</MenuItem>
                    <MenuItem value={"so"}>Somalia</MenuItem>
                    <MenuItem value={"za"}>South Africa</MenuItem>
                    <MenuItem value={"kr"}>South Korea</MenuItem>
                    <MenuItem value={"es"}>Spain</MenuItem>
                    <MenuItem value={"lk"}>Sri Lanka</MenuItem>
                    <MenuItem value={"sr"}>Suriname</MenuItem>
                    <MenuItem value={"sz"}>Swaziland</MenuItem>
                    <MenuItem value={"se"}>Sweden</MenuItem>
                    <MenuItem value={"ch"}>Switzerland</MenuItem>
                    <MenuItem value={"sy"}>Syria</MenuItem>
                    <MenuItem value={"tw"}>Taiwan</MenuItem>
                    <MenuItem value={"tj"}>Tajikistan</MenuItem>
                    <MenuItem value={"th"}>Thailand</MenuItem>
                    <MenuItem value={"tl"}>Timor-leste</MenuItem>
                    <MenuItem value={"tg"}>Togo</MenuItem>
                    <MenuItem value={"to"}>Tonga</MenuItem>
                    <MenuItem value={"tt"}>Trinidad And Tobago</MenuItem>
                    <MenuItem value={"tr"}>Turkey</MenuItem>
                    <MenuItem value={"tv"}>Tuvalu</MenuItem>
                    <MenuItem value={"ua"}>Ukraine</MenuItem>
                    <MenuItem value={"ug"}>Uganda</MenuItem>
                    <MenuItem value={"ae"}>United Arab Emirates</MenuItem>
                    <MenuItem value={"gb"}>United Kingdom</MenuItem>
                    <MenuItem value={"us"}>United States Of America</MenuItem>
                    <MenuItem value={"uy"}>Uruguay</MenuItem>
                    <MenuItem value={"uz"}>Uzbekistan</MenuItem>
                    <MenuItem value={"vu"}>Vanuatu</MenuItem>
                    <MenuItem value={"zm"}>Zambia</MenuItem>

                </Select>
            </FormControl>
            <br />

            {/* <Typography variant='h5' >Layout</Typography> */}
            {/* <FormControl sx={styles.menuFormControl}> */}
            {/* <InputLabel id="demo-controlled-open-select-label2">Lang</InputLabel> */}
            {/* <Select
                    // labelId="demo-controlled-open-select-label2"
                    id="demo-controlled-open-select2"
                    open={openLayout}
                    onClose={handleCloseLayout}
                    onOpen={handleOpenLayout}
                    value={layout}
                    label="layout"
                    onChange={handleChangeLayout}
                >
                    <MenuItem value={10}>classic</MenuItem>
                    <MenuItem value={20}>inspiration</MenuItem>
                    <MenuItem value={30}>casual</MenuItem>
                </Select> */}
            {/* </FormControl> */}

        </Menu >
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {/* <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem> */}
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* <GoogleOAuthProvider clientId={config.google_client_id}>
                <CustomGoogleLogin />
            </GoogleOAuthProvider> */}


            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2, display: { xs: "block", sm: "block", md: "none", lg: "none", xl: "none" } }}
                        onClick={() => setAnchor(value => !value)}
                    >
                        <MenuIcon
                        />
                    </IconButton>

                    <Image style={styles.image} src={appLogo} alt='logo' />
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ fontFamily: "monospace" }}
                    >
                        Eagle News
                    </Typography>

                    <Box
                        sx={{ display: { xs: "none", sm: "none", md: "contents", lg: "contents", xl: "contents" } }}
                    >

                        {profileBar()}
                    </Box>


                    <Box sx={{ flexGrow: 1 }} />

                    <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
                        {/* <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton> */}
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <PublicIcon />
                        </IconButton>
                        {/* <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            color="inherit"
                            href='/profile'
                        >
                            <AccountCircle />
                        </IconButton> */}

                    </Box>

                    {/* <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box> */}

                </Toolbar>
                <Toolbar sx={{ display: { xs: "none", sm: "none", md: "block", lg: "block", xl: "block" } }}>
                    {tabs()}
                </Toolbar>
                <Toolbar sx={{ display: { xs: "inline-flex", sm: "inline-flex", md: "none", lg: "none", xl: "none" } }}>
                    {profileBar()}
                </Toolbar>
            </AppBar>

            {renderMenu}
            {/* {renderMobileMenu} */}
            <SwipeableDrawer
                open={anchor}
                onClose={() => setAnchor(false)}
                onOpen={() => setAnchor(true)}
            >
                {list()}
            </SwipeableDrawer>
        </Box>
    );
}



