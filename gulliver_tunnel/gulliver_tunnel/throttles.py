from rest_framework.throttling import UserRateThrottle


class RedirectRateThrottle(UserRateThrottle):
    scope = "redirect"
