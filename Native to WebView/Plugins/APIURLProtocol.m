//
//  APIURLProtocol.m
//  NativeJsWebView
//
//  Created by Yaacov Akiba Slama on 3/31/14.
//  Copyright (c) 2014 Peter Traeg. All rights reserved.
//

#import "APIURLProtocol.h"

NSString *const APIURLScheme = @"javascript-api";

@implementation APIURLProtocol

+ (BOOL)canInitWithRequest:(NSURLRequest *)request {
     return [[[request URL] scheme] caseInsensitiveCompare:APIURLScheme] == NSOrderedSame;
}

- (void)URLProtocol:(NSURLProtocol *)protocol didFailWithError:(NSError *)error{

}
- (void)URLProtocolDidFinishLoading:(NSURLProtocol *)protocol{

}
- (void)URLProtocol:(NSURLProtocol *)protocol didLoadData:(NSData *)data{

}

- (void)URLProtocol:(NSURLProtocol *)protocol didReceiveResponse:(NSURLResponse *)response cacheStoragePolicy:(NSURLCacheStoragePolicy)policy{

}
+ (NSURLRequest *)canonicalRequestForRequest:(NSURLRequest *)request
{
    return request;
}

+ (BOOL)requestIsCacheEquivalent:(NSURLRequest *)a toRequest:(NSURLRequest *)b {
    //return [super requestIsCacheEquivalent:a toRequest:b];
    //NSLog(@"Request equivalence %@ ~ %@", a.URL.absoluteString, b.URL.absoluteString);
    return NO;
}

- (void)startLoading {
    
    //NSLog(@"%@ received %@ - start", self, NSStringFromSelector(_cmd));
    
    NSURLRequest *request = [self request];
    NSString* path = [[[request URL] path] substringFromIndex:1];
    NSString* query = [[request URL] query];
    //NSLog(@"Path: %@, Query: %@", path, query);
    NSDictionary *rHeaders = [request allHTTPHeaderFields];
    NSError *error1;
    NSData *headersData = [NSJSONSerialization dataWithJSONObject:rHeaders options:0 error:&error1];
    NSString *headersJSON = [ [NSString alloc] initWithData:headersData encoding:NSUTF8StringEncoding] ;
    //NSLog(@"Headers: %@", headersJSON);

    NSDictionary *namesDict = @{@"data": [@"" stringByPaddingToLength:20*1024*1024 withString:@"1" startingAtIndex:0] };
    NSError *error;
    NSData *data = [NSJSONSerialization dataWithJSONObject:namesDict options:0 error:&error];
    NSDictionary *headers = @{@"Access-Control-Allow-Origin" : @"*", @"Access-Control-Allow-Headers" : @"Content-Type"};
    
    NSHTTPURLResponse *response = [[NSHTTPURLResponse alloc] initWithURL:request.URL statusCode:200 HTTPVersion:@"1.1" headerFields:headers];
    
    //NSURLResponse *response = [[NSURLResponse alloc] initWithURL:[request URL] MIMEType:@"application/javascript" expectedContentLength:[data length] textEncodingName:nil];
    id<NSURLProtocolClient> client = [self client];
    [client URLProtocol:self didReceiveResponse:response cacheStoragePolicy:NSURLCacheStorageNotAllowed];

    [client URLProtocol:self didLoadData:data];
    [client URLProtocolDidFinishLoading:self];
    if (0) { /* in case of error */
        int resultCode;
        resultCode = NSURLErrorResourceUnavailable;
        [client URLProtocol:self didFailWithError:[NSError errorWithDomain:NSURLErrorDomain code:resultCode userInfo:nil]];
        //NSLog(@"%@ received %@ - end", self, NSStringFromSelector(_cmd));
    }
    //NSLog(@"%@ received %@ - end", self, NSStringFromSelector(_cmd));
}

- (void)stopLoading
{
    //NSLog(@"%@ received %@", self, NSStringFromSelector(_cmd));
}

@end
