import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  fc = `2018-02-14 17:26:50,781:CRITICAL:NodeExecutor:Traceback (most recent call last):
  File "/opt/slipstream/client/lib/slipstream/daemonr/DaemonRunner.py", line 35, in __init__
    self.run_action(runnable)
  File "/opt/slipstream/client/lib/slipstream/daemonr/DaemonRunner.py", line 61, in run_action
    self.do_action()
  File "/opt/slipstream/client/lib/daemon/runner.py", line 267, in do_action
    func(self)
  File "/opt/slipstream/client/lib/daemon/runner.py", line 186, in _start
    self.app.run()
  File "/opt/slipstream/client/sbin/slipstream-node", line 61, in run
    self._executor.do_work()
  File "/opt/slipstream/client/sbin/slipstream-node", line 120, in do_work
    self._callAndHandleErrorsForCommands(self.doWork.__name__)
  File "/opt/slipstream/client/lib/slipstream/command/CommandBase.py", line 150, in _callAndHandleErrorsForCommands
    self._exit(7)
  File "/opt/slipstream/client/lib/slipstream/command/CommandBase.py", line 122, in _callAndHandleErrorsForCommands
    res = self.__class__.__dict__[methodName](self, *args, **kw)
  File "/opt/slipstream/client/sbin/slipstream-node", line 124, in doWork
    node.execute()
  File "/opt/slipstream/client/lib/slipstream/executors/Machine.py", line 40, in execute
    executor.execute()
  File "/opt/slipstream/client/lib/slipstream/executors/MachineExecutor.py", line 72, in execute
    self._fail_global(ex)
  File "/opt/slipstream/client/lib/slipstream/executors/MachineExecutor.py", line 146, in _fail_global
    self.wrapper.fail_global(self._failure_msg_from_exception(exception))
  File "/opt/slipstream/client/lib/slipstream/wrappers/BaseWrapper.py", line 168, in fail_global
    self._fail(key, message)
  File "/opt/slipstream/client/lib/slipstream/wrappers/BaseWrapper.py", line 174, in _fail
    self._ss_client.setRuntimeParameter(key, value)
  File "/opt/slipstream/client/lib/slipstream/SlipStreamHttpClient.py", line 229, in setRuntimeParameter
    accept='text/plain')
  File "/opt/slipstream/client/lib/slipstream/SlipStreamHttpClient.py", line 245, in _httpPut
    return self.httpClient.put(url, body, contentType, accept, retry=self.retry)
  File "/opt/slipstream/client/lib/slipstream/HttpClient.py", line 184, in put
    resp = self._call(url, 'PUT', body, contentType, accept, retry=retry)
  File "/opt/slipstream/client/lib/slipstream/HttpClient.py", line 300, in _call
    resp = _handle_response(resp)
  File "/opt/slipstream/client/lib/slipstream/HttpClient.py", line 277, in _handle_response
    return _handle4xx(resp)
  File "/opt/slipstream/client/lib/slipstream/HttpClient.py", line 227, in _handle4xx
    raise clientEx
NotFoundError: Not Found`

  constructor() { }

  ngOnInit() {
  }

}
