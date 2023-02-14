import { onMounted } from 'vue';

onMounted(() => {
  const style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerText = `
.code-sandbox-active-menu-item {
  color: #3491fa;
  &:hover {
    color: #fff;
  }
}

.code-sandbox-message {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 12px;
  font-size: 12px;
  color: #409eff;
  background-color: #ecf5ff;
  border: 1px solid #d9ecff;
  border-radius: 4px;
}

.code-sandbox-message-info {
  color: #409eff;
  background-color: #ecf5ff;
  border: 1px solid #d9ecff;
}

.code-sandbox-message-danger {
  color: #f56c6c;
  border: 1px solid #fde2e2;
  background-color: #fef0f0;
}

.code-sandbox-message-success {
  color: #67c23a;
  border: 1px solid #e1f3d8;
  background-color: #f0f9eb;
}
`;
  document.head.append(style);
});