<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'd+~R#PP-k0$BZ^zoCn~ fb4=-U,[UFV/z$EE}yNjQDHEr(G?P;Y!,Yqpf J)neOQ' );
define( 'SECURE_AUTH_KEY',  '.[In/M?0wp_0ggb:4/HI$%jS$@.!R_%>qcq}}20mK#TRwYe+aH2J mL}+@|^-JV-' );
define( 'LOGGED_IN_KEY',    '~<l%B38M~W}S96+(Vw,r?Y=VRvkU :Q/e|-i@Ka@`xZK/! jJfX GJ`.|T6uGPbO' );
define( 'NONCE_KEY',        'l8fN6|gWto_;m}{t ,:h 0K*^i.g~`QOKV,}M:6Zxu^_]XNgMS%jp-O3tH:tEfSU' );
define( 'AUTH_SALT',        'S:i?I]JYil)fLc)L 5{?y6dF|ZfMi7cfw1@S+$;$3sL|9s~>Qn`J]_8eR,jk.N)&' );
define( 'SECURE_AUTH_SALT', 'u=}.D#3]]*%MTi&p$a2o,.<UC8Q795_kc:DfK<)-OS1~}>B; o]1NRB8YUL|rb)q' );
define( 'LOGGED_IN_SALT',   'h@jJ0i);b+>PM_O*{;$7[Y<Re5W3:mnB7o$te]ZmC5Aq@%@p,,^G5KBs@1HhFn-2' );
define( 'NONCE_SALT',       'X(@[<^:(XUEL@HoG:T 6eejI;-*V10B6|zOnAc};+ct<Ol<x3k)L>Bx>N-$vnf-0' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
