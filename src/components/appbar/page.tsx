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
import appLogo from "../../../public/twitter.svg"
import Image from 'next/image';
import { FormControl, InputLabel, Select, SelectChangeEvent, Tab, Tabs } from '@mui/material';
import { useRouter } from 'next/navigation'
import SettingsIcon from '@mui/icons-material/Settings';




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
    const router = useRouter()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [value, setValue] = React.useState(0);
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


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        router.push(`/${newValue}`, { scroll: false })

    };




    const [lang, setLang] = React.useState<string | number>('');
    const [openLang, setOpenLang] = React.useState(false);

    const [layout, setLayout] = React.useState<string | number>('');
    const [openLayout, setOpenLayout] = React.useState(false);

    const handleChangeLang = (event: SelectChangeEvent<typeof lang>) => {
        setLang(event.target.value);
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
            MenuListProps={{ onMouseLeave: handleMenuClose }}
        >


            <Typography variant='h5' >
                <u>
                    Settings
                </u>
            </Typography>
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
                    value={lang}
                    label="lang"
                    onChange={handleChangeLang}
                >
                    <MenuItem value={10}>arabic</MenuItem>
                    <MenuItem value={20}>english</MenuItem>
                    <MenuItem value={30}>french</MenuItem>
                </Select>
            </FormControl>
            <br />

            <Typography variant='h5' >Layout</Typography>
            <FormControl sx={styles.menuFormControl}>
                {/* <InputLabel id="demo-controlled-open-select-label2">Lang</InputLabel> */}
                <Select
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
                </Select>
            </FormControl>

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
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
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
            </MenuItem>
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
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon
                        // onClick={window.alert}
                        />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={styles.button}
                    >
                        MUI
                    </Typography>
                    <Image style={styles.image} src={appLogo} alt='logo' />
                    <Search sx={styles.search}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />

                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onMouseOver={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <SettingsIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
                    </Box>
                </Toolbar>
                <Toolbar>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                        TabIndicatorProps={{ style: styles.tabIndicatorProps }}
                        TabScrollButtonProps={{ style: { color: "white" } }}
                        textColor='inherit'

                    >
                        <Tab sx={styles.tab} label="Discover" value="" />
                        <Tab sx={styles.tab} label="News" value="News" />
                        <Tab sx={styles.tab} label="Sports" value="Sports" />
                        <Tab sx={styles.tab} label="Play" value="Play" />
                        <Tab sx={styles.tab} label="Money" value="Money" />
                        <Tab sx={styles.tab} label="Gaming" value="Gaming" />
                        <Tab sx={styles.tab} label="Weather" value="Weather" />
                        <Tab sx={styles.tab} label="Watch" value="Watch" />
                        <Tab sx={styles.tab} label="Shopping" value="Shopping" />
                        <Tab sx={styles.tab} label="Health" value="Health" />
                        <Tab sx={styles.tab} label="Travel" value="Travel" />
                        <Tab sx={styles.tab} label="Traffic" value="Traffic" />
                        <Tab sx={styles.tab} label="Autos" value="Autos" />
                        <Tab sx={styles.tab} label="Learning" value="Learning" />
                        <Tab sx={styles.tab} label="Real Estate" value="Real Estate" />
                    </Tabs>
                </Toolbar>
            </AppBar>

            {renderMenu}
            {renderMobileMenu}
        </Box>
    );
}
