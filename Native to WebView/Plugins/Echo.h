/********* Echo.h Cordova Plugin Header *******/

#import <Cordova/CDV.h>

 @interface Echo : CDVPlugin

- (void)pluginInitialize;

- (void)echo:(CDVInvokedUrlCommand*)command;

@end
